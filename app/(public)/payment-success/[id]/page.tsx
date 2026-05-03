"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function PaymentSuccessPage() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const invoiceId = Number(id);

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-10 max-w-md w-full text-center">

                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                </div>

                <h1 className="text-2xl font-semibold text-slate-900 mb-2">
                    Payment Successful!
                </h1>
                <p className="text-slate-500 text-sm mb-8">
                    Your invoice #{invoiceId} has been paid successfully.
                    A confirmation email will be sent shortly.
                </p>

                <div className="flex flex-col gap-3">
                    <Button
                        className="bg-blue-600 hover:bg-blue-700 text-white w-full"
                        onClick={() => router.push("/login")}
                    >
                        Go to Dashboard
                    </Button>
                </div>

            </div>
        </div>
    );
}