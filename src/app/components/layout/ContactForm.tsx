import { ContactCard } from "@/app/components/ui/contact-card";
import { MailIcon, PhoneIcon, MapPinIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function ContactForm() {
	return (
		<main className="relative flex min-h-screen w-full items-center justify-center p-4 bg-[#141414] text-white">
			<div className="mx-auto max-w-6xl">
				<ContactCard
					title="Get in touch"
					description="If you have any questions regarding our Services or need help, please fill out the form here. We do our best to respond within 1 business day."
					contactInfo={[
						{
							icon: MailIcon,
							label: 'Email',
							value: 'contact@ao-interactive.dev',
						},
						{
							icon: PhoneIcon,
							label: 'Phone',
							value: '3423842234',
						},
						{
							icon: MapPinIcon,
							label: 'Address',
							value: 'saudi Arabia',
							className: 'col-span-2',
						}
					]}
					className="bg-[#141414] text-white border border-[#40ED70] shadow-lg"
				>
					<form action="" className="w-full space-y-4">
						<div className="flex flex-col gap-2">
							<Label className="text-[#40ED70]">Name</Label>
							<Input 
								type="text" 
								className="bg-[#141414] border border-[#40ED70] text-white placeholder:text-gray-400 focus:ring-2 focus:ring-[#40ED70]" 
								placeholder="Your name"
							/>
						</div>
						<div className="flex flex-col gap-2">
							<Label className="text-[#40ED70]">Email</Label>
							<Input 
								type="email" 
								className="bg-[#141414] border border-[#40ED70] text-white placeholder:text-gray-400 focus:ring-2 focus:ring-[#40ED70]" 
								placeholder="you@example.com"
							/>
						</div>
						<div className="flex flex-col gap-2">
							<Label className="text-[#40ED70]">Phone</Label>
							<Input 
								type="phone" 
								className="bg-[#141414] border border-[#40ED70] text-white placeholder:text-gray-400 focus:ring-2 focus:ring-[#40ED70]" 
								placeholder="+92 312 1234567"
							/>
						</div>
						<div className="flex flex-col gap-2">
							<Label className="text-[#40ED70]">Message</Label>
							<Textarea 
								className="bg-[#141414] border border-[#40ED70] text-white placeholder:text-gray-400 focus:ring-2 focus:ring-[#40ED70]" 
								placeholder="Your message"
							/>
						</div>
						<Button 
							className="w-full bg-[#40ED70] text-[#141414] hover:bg-[#36c95a] focus:ring-4 focus:ring-[#40ED70]/50" 
							type="button"
						>
							Submit
						</Button>
					</form>
				</ContactCard>
			</div>
		</main>
	);
}
