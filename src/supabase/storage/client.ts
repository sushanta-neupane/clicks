import { createSupabaseClient } from '../client';
import { v4 as uuidv4 } from 'uuid';
import imageCompression from 'browser-image-compression';
import { ImagesResults } from '@/models/Images';

function getStorage() {
  const { storage } = createSupabaseClient();
  return storage;
}

const supabase = createSupabaseClient();

type UploadProps = {
  file: File;
  bucket: string;
  options: {
    tags: string[];
    alt: string;
  };
  folder?: string;
};

export const uploadImage = async ({
  file,
  bucket,
  folder,
  options,
}: UploadProps) => {
  const dimensions = await getImageDimensions(file);

  const fileName = file.name;
  const fileExtension = fileName.slice(fileName.lastIndexOf('.') + 1);
  const path = `${folder ? folder + '/' : ''}${uuidv4()}.${fileExtension}`;

  try {
    file = await imageCompression(file, {
      maxSizeMB: 1,
    });
  } catch (error) {
    console.error(error);
    return { imageUrl: '', error: 'Image compression failed' };
  }

  const storage = getStorage();

  const { data, error } = await storage.from(bucket).upload(path, file);

  if (error) {
    return { imageUrl: '', error: 'Image upload failed' };
  }

  const imageUrl = `${process.env
    .NEXT_PUBLIC_SUPABASE_URL!}/storage/v1/object/public/${bucket}/${
    data?.path
  }`;
  await supabase.from('clicks').insert({
    img_id: data.id,
    height: dimensions.height,
    width: dimensions.width,
    tags: options.tags,
    alt: options.alt,
    url: imageUrl,
  });

  return { imageUrl, error: '' };
};

export const deleteImage = async (imageUrl: string, img_id: string) => {
  try {
    // Extract the bucket and path from the URL
    const bucketAndPathString = imageUrl.split('/storage/v1/object/public/')[1];
    const firstSlashIndex = bucketAndPathString.indexOf('/');
    const bucket = bucketAndPathString.slice(0, firstSlashIndex);
    const path = bucketAndPathString.slice(firstSlashIndex + 1);

    // Remove image from storage
    const { data: storageData, error: storageError } = await supabase.storage
      .from(bucket)
      .remove([path]);
    if (storageError) throw storageError;

    // Delete image from database
    const { data: dbData, error: dbError } = await supabase
      .from('clicks')
      .delete()
      .eq('img_id', img_id);

    if (dbError) throw dbError;
    console.log('deleted', storageData, dbData);

    return { storageData, dbData, success: true };
  } catch (error) {
    console.error('Error deleting image:', error);
    return { success: false, error };
  }
};
export const getImage = async (img_id: string) => {
  try {
    // Extract the bucket and path from the URL
    const table = process.env.NEXT_PUBLIC_SUPABASE_TABLE!;

    // get data
    const { data: dbData, error: dbError } = await supabase
      .from(table)
      .select()
      .eq('img_id', img_id);

    if (dbError) throw dbError;

    return dbData;
  } catch (error) {
    console.error('Error deleting image:', error);
    return error;
  }
};

export const editImage = async (
  img_id: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updatedData: Record<string, any>
) => {
  try {
    // Update image data in the database
    const { data, error } = await supabase
      .from('clicks')
      .update(updatedData)
      .eq('img_id', img_id);
    if (error) throw error;

    return { data, success: true };
  } catch (error) {
    console.error('Error updating image:', error);
    return { success: false, error };
  }
};

export const listImages = async (table: string) => {
  const { data: photos } = await supabase.from(table).select();

  if (!photos || photos.length <= 0) {
    console.log('Failed to fetch images');
    return {
      page: 1,
      per_page: 0,
      total_results: 0,
      photos: [],
      error: 'Failed to fetch images',
    };
  }

  const imgResults: ImagesResults = {
    page: 1,
    per_page: photos.length,
    total_results: photos.length,
    photos,
  };

  return imgResults;
};

const getImageDimensions = (
  file: File
): Promise<{ width: number; height: number }> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve({
        width: img.width,
        height: img.height,
      });
    };
    img.src = URL.createObjectURL(file);
  });
};
