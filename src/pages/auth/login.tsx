"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import Navbar from "../callable/Navbar";
import Swal from "sweetalert2";

export default function Login() {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [generatedOtp, setGeneratedOtp] = useState("");
    const [step, setStep] = useState<"EMAIL" | "OTP">("EMAIL");
    const [isValid, setIsValid] = useState(false);

    const [canResend, setCanResend] = useState(false);
    const [resendTimer, setResendTimer] = useState(360);
    const otpInputRef = useRef<HTMLDivElement>(null);

    // Focus automatique sur premier input OTP quand on passe à l'étape OTP
    useEffect(() => {
        if (step === "OTP") {
            setTimeout(() => {
                otpInputRef.current?.querySelector("input")?.focus();
            }, 100);
        }
    }, [step]);

    // Timer pour le cooldown du bouton "Renvoyer le code"
    useEffect(() => {
        if (resendTimer === 0) {
            setCanResend(true);
            return;
        }
        const timerId = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
        return () => clearTimeout(timerId);
    }, [resendTimer]);

    // Génération OTP 6 chiffres
    const generateOtp = () => {
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        setGeneratedOtp(code);
        return code;
    };

    // Envoi OTP backend
    const sendOtpByEmail = async () => {
        if (!email) return;
        const otpCode = generateOtp();
        try {
            await fetch("/api/send-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp: otpCode }),
            });
            setStep("OTP");
            setOtp("");
            setResendTimer(30);
            setCanResend(false);
        } catch (error) {
            console.error("Erreur lors de l'envoi de l'OTP :", error);
            alert("Erreur lors de l'envoi du code, réessayez plus tard.");
        }
    };

    // Vérification OTP
    const verifyOtp = () => {
        if (otp.length !== 6) {
            alert("Veuillez saisir les 6 chiffres du code.");
            return;
        }
        if (otp === generatedOtp) {
            setIsValid(true);
            Swal.fire({
                title: "Connexion réussie",
                text: "Vous êtes maintenant connecté.",
                icon: "success",
            });
            // TODO: rediriger ou autre logique
        } else {
            alert("OTP incorrect. Réessayez.");
        }
    };

    // Limite la saisie OTP à 6 caractères max, uniquement chiffres
    const handleOtpChange = (value: string) => {
        if (/^\d*$/.test(value) && value.length <= 6) {
            setOtp(value);
        }
    };

    return (
        <>
            <Navbar />
            <Card className="w-full max-w-sm mx-auto mt-20 p-6">
                <CardHeader>
                    <CardTitle>Connectez-vous à votre compte</CardTitle>
                    <CardDescription>Entrez votre email pour vous connecter</CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="josephstaline@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value.trim())}
                                    required
                                    disabled={step === "OTP"} />
                            </div>
                        </div>
                    </form>
                </CardContent>

                <CardFooter className="flex-col gap-2">
                    <Dialog open={step === "OTP"} onOpenChange={(open) => {
                        if (!open) {
                            setStep("EMAIL");
                            setOtp("");
                        }
                    }}>
                        <DialogTrigger asChild>
                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={sendOtpByEmail}
                                disabled={!email.includes("@") || step === "OTP"}
                            >
                                Connexion
                            </Button>
                        </DialogTrigger>

                        <DialogContent
                            className="sm:max-w-[425px]"
                            ref={otpInputRef}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    verifyOtp();
                                }
                            }}
                        >
                            <DialogHeader>
                                <DialogTitle>Vérification OTP</DialogTitle>
                                <DialogDescription>
                                    Un code a été envoyé à <strong>{email}</strong>.
                                </DialogDescription>
                            </DialogHeader>

                            <InputOTP maxLength={6} value={otp} onChange={handleOtpChange}>
                                <InputOTPGroup>
                                    <InputOTPSlot index={0} />
                                    <InputOTPSlot index={1} />
                                    <InputOTPSlot index={2} />
                                </InputOTPGroup>
                                <InputOTPSeparator />
                                <InputOTPGroup>
                                    <InputOTPSlot index={3} />
                                    <InputOTPSlot index={4} />
                                    <InputOTPSlot index={5} />
                                </InputOTPGroup>
                            </InputOTP>

                            <div className="text-sm text-muted-foreground mt-2 text-center">
                                {otp.length} / 6 chiffres saisis
                            </div>

                            <DialogFooter className="flex justify-between">
                                <DialogClose asChild>
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            setStep("EMAIL");
                                            setOtp("");
                                        }}
                                    >
                                        Annuler
                                    </Button>
                                </DialogClose>
                                <Button type="button" onClick={verifyOtp} disabled={otp.length !== 6}>
                                    Soumettre
                                </Button>
                            </DialogFooter>

                            <Button
                                variant="link"
                                disabled={!canResend}
                                onClick={() => {
                                    if (canResend) {
                                        sendOtpByEmail();
                                    }
                                }}
                                className="mt-2 w-full"
                            >
                                {canResend ? "Renvoyer le code" : `Renvoyer dans ${resendTimer}s`}
                            </Button>
                        </DialogContent>
                    </Dialog>

                    <Button variant="outline" className="w-full">
                        Se connecter avec Google
                    </Button>
                </CardFooter>
            </Card></>
    );
}
