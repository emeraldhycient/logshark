// components/GapsSection.tsx
const gaps = [
    {
        title: 'Privacy-Focused Analytics',
        description: 'Logshark prioritizes user privacy, offering GDPR-compliant, cookie-free analytics.',
    },
    {
        title: 'Real-Time Insights',
        description: 'Get instant updates and insights without delays, perfect for e-commerce or time-sensitive apps.',
    },
    {
        title: 'Predictive Analytics & AI',
        description: 'Leverage machine learning to predict user behavior and optimize engagement.',
    },
];

const GapsSection = () => {
    return (
        <section className="bg-white py-16">
            <div className="container mx-auto">
                <h2 className="text-4xl font-bold text-center mb-8">How We Stand Out</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {gaps.map((gap, idx) => (
                        <div key={idx} className="bg-gray-100 p-6 rounded-lg text-center">
                            <h3 className="text-2xl font-semibold mb-4">{gap.title}</h3>
                            <p className="text-gray-600">{gap.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GapsSection;
