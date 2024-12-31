# Clicks

Clicks is a web application showcasing your photography hobby with additional features such as image-to-text conversion and seamless storage using Supabase.

---

## Features

- **Photography Showcase:** Display a gallery of your clicked photographs.
- **Image-to-Text Conversion:** Extract text from images using Hugging Face API.
- **Supabase Integration:** Store your photos and related metadata securely.

---

## Tech Stack

- **Frontend:** Next.js
- **Backend:** Supabase + Next.js
- **Image Processing:** Hugging Face API
- **Storage:** Supabase Cloud Storage

---

## Getting Started

### Prerequisites

1. Node.js and npm installed on your machine.
2. A Supabase project with its URL and anon key.
3. A Hugging Face API key.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/clicks.git
   cd clicks
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file and populate it as shown in the `.env.example`:

   ```plaintext
   NEXT_PUBLIC_SUPABASE_URL="SUPABASE_URL"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="SUPABASE_KEY"
   NEXT_PUBLIC_HUGGING_FACE_API="your_hugging_face_api"
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

   Your application will be available at [http://localhost:3000](http://localhost:3000).

---

## Usage

### Photography Showcase

- Add your favorite photos to the Supabase storage bucket.
- Use the app's interface to organize and display your photo gallery.

### Image-to-Text Feature

- Upload an image to the app.
- The extracted text will be displayed using Hugging Face’s API.

---

## Folder Structure

```
.
├── public       # Static assets such as images
├── src
│   ├── components # Reusable components for the UI
│   ├── pages      # Next.js pages
│   ├── styles     # CSS modules
│   └── utils      # Utility functions for API calls
├── .env.example # Example environment variables
├── package.json  # Project dependencies
└── README.md     # Project documentation
```

---

## API Configuration

### Supabase

- Create a storage bucket in Supabase for storing images.
- Configure Supabase project keys in your `.env.local` file.

### Hugging Face

- Obtain an API key from [Hugging Face](https://huggingface.co/).
- Add it to the `.env.local` file.

---

## Deployment

1. Build the application:

   ```bash
   npm run build
   ```

2. Deploy to a hosting platform (e.g., Vercel, Netlify).

3. Configure the environment variables on the hosting platform as shown in `.env.example`.
