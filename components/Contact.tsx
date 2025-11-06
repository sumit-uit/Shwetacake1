import React from 'react';

// FIX: Changed icon prop type from JSX.Element to React.ReactNode to resolve "Cannot find namespace 'JSX'" error.
const ContactInfoCard: React.FC<{ icon: React.ReactNode; title: string; detail: string; href?: string }> = ({ icon, title, detail, href }) => (
    <div className="bg-white p-8 rounded-lg shadow-lg text-center flex flex-col items-center hover:shadow-xl transition-shadow duration-300">
        <div className="text-[#d4af37] mb-4">{icon}</div>
        <h3 className="text-2xl font-semibold text-[#3a2e25] mb-2">{title}</h3>
        {href ? (
            <a href={href} className="text-lg text-gray-600 hover:text-[#d4af37] break-all">{detail}</a>
        ) : (
            <p className="text-lg text-gray-600">{detail}</p>
        )}
    </div>
);

const Contact: React.FC = () => {
    return (
        <section id="contact" className="py-20 lg:py-32 bg-white scroll-mt-20">
            <div className="container mx-auto px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-bold text-[#3a2e25] mb-4">Ready to Order?</h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Get in touch to discuss your custom creation or place an order for our signature treats. We'd love to bake for you!
                    </p>
                </div>

                <div className="text-center mb-16">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a 
                            href="https://calendar.app.google/dDw8n4MjcnRVL9TU6"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-[#854d27] text-white font-bold py-4 px-10 rounded-full text-xl hover:bg-[#3a2e25] transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
                        >
                            Book Your Appointment
                        </a>
                        <a 
                            href="https://www.facebook.com/ShwetaCakeNCookies/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-[#d4af37] text-white font-bold py-4 px-10 rounded-full text-xl hover:bg-[#854d27] transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
                        >
                            Request Consultation
                        </a>
                    </div>
                    <p className="mt-6 text-gray-500">For custom orders and scheduling.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <ContactInfoCard 
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
                        title="Email Us"
                        detail="sonibakeart@gmail.com"
                        href="mailto:sonibakeart@gmail.com"
                    />
                    <ContactInfoCard 
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>}
                        title="Call Us"
                        detail="(226) 868-8316"
                        href="tel:2268688316"
                    />
                    <ContactInfoCard 
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                        title="Location"
                        detail="Waterloo, ON, Canada"
                    />
                </div>
            </div>
        </section>
    );
};

export default Contact;