import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ApplicationForm from "@/components/ApplicationForm";

export default function ApplyPage() {
    return (
        <main className="min-h-screen bg-stone-50">
            <Navbar />
            <div className="pt-32 pb-20 container mx-auto px-4">
                <center className="mb-8">
                    <h1 className="text-4xl font-bold text-brand-blue-dark">Application Form</h1>
                    <p className="text-gray-600 mt-2">Join us in Turkey for a brighter future.</p>
                </center>
                <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-stone-100">
                    <ApplicationForm />
                </div>
            </div>
            <Footer />
        </main>
    );
}
