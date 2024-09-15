// components/Footer.tsx
const Footer = () => {
    return (
        <footer className="bg-black text-gray-400 py-8">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* About Section */}
                <div>
                    <h3 className="text-white text-lg mb-4">About Logshark</h3>
                    <ul className="space-y-2">
                        <li><a href="#about" className="hover:text-white">Introduction</a></li>
                        <li><a href="#security" className="hover:text-white">Security</a></li>
                        <li><a href="#community" className="hover:text-white">Community</a></li>
                    </ul>
                </div>

                {/* Download Section */}
                <div>
                    <h3 className="text-white text-lg mb-4">Download</h3>
                    <ul className="space-y-2">
                        <li><a href="#github" className="hover:text-white">GitHub</a></li>
                        <li><a href="#npm" className="hover:text-white">NPM</a></li>
                    </ul>
                </div>

                {/* Acknowledgments Section */}
                <div>
                    <h3 className="text-white text-lg mb-4">Acknowledgments</h3>
                    <ul className="space-y-2">
                        <li><a href="#contributors" className="hover:text-white">Contributors</a></li>
                        <li><a href="#sponsors" className="hover:text-white">Sponsors</a></li>
                    </ul>
                </div>
            </div>

            {/* Copyright */}
            <div className="text-center mt-8 text-gray-500">
                <p>Logshark © 2024 - Built by [Your Name/Team]. Powered by Vercel.</p>
            </div>
        </footer>
    );
};

export default Footer;
