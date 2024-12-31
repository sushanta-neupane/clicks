const Footer = () => {
    return (
        <div className="flex flex-col items-center lg:items-start p-16 justify-center  gap-8 lg:gap-16 rounded-xl font-light relative flex-1 bg-primary text-white dark:text-black sm:flex-row">
            {/* Attribution */}
            <div className="text-sm">
                <p>
                    <span className="opacity-60">Made with  ❤️  By </span>
                    <a
                        href="https://github.com/sushanta-neupane"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-2"
                    >
                        Sushanta
                    </a>

                </p>
            </div>
            <div className="text-sm">
                <p>
                    <span className="opacity-60">Inspired By  </span>
                    <a
                        href="https://templates.gola.io/template/hanssen"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-2"
                    >
                        hanssen
                    </a>

                </p>
            </div>
        </div>
    );
};

export default Footer;
