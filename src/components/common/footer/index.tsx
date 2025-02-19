import { BarChart } from "lucide-react";
import React from "react";

function Footer() {
	return (
		<footer className="bg-gradient-to-r from-black to-gray-900 text-white py-12">
			<div className="container mx-auto px-4">
				<div className="flex flex-col md:flex-row justify-between gap-y-6">
					<div>
						<div className="flex items-center space-x-2 mb-4">
							<BarChart className="h-8 w-8 text-blue-400" />
							<span className="text-2xl font-bold">LogShark</span>
						</div>
						<p className="text-gray-400">
							Empowering businesses with real-time, <br />
							privacy-focused analytics.
						</p>
					</div>

					<div className="flex flex-wrap flex-row gap-x-28 gap-y-8">
						<div>
							<h3 className="text-lg font-semibold mb-4">
								Product
							</h3>
							<ul className="space-y-2">
								<li>
									<a
										href="#"
										className="text-gray-400 hover:text-white transition-colors"
									>
										Features
									</a>
								</li>
								<li>
									<a
										href="#"
										className="text-gray-400 hover:text-white transition-colors"
									>
										Pricing
									</a>
								</li>
								<li>
									<a
										href="#"
										className="text-gray-400 hover:text-white transition-colors"
									>
										Case Studies
									</a>
								</li>
							</ul>
						</div>
						<div>
							<h3 className="text-lg font-semibold mb-4">
								Company
							</h3>
							<ul className="space-y-2">
								<li>
									<a
										href="#"
										className="text-gray-400 hover:text-white transition-colors"
									>
										About Us
									</a>
								</li>
								<li>
									<a
										href="#"
										className="text-gray-400 hover:text-white transition-colors"
									>
										Careers
									</a>
								</li>
								<li>
									<a
										href="#"
										className="text-gray-400 hover:text-white transition-colors"
									>
										Contact
									</a>
								</li>
							</ul>
						</div>
						<div>
							<h3 className="text-lg font-semibold mb-4">
								Legal
							</h3>
							<ul className="space-y-2">
								<li>
									<a
										href="#"
										className="text-gray-400 hover:text-white transition-colors"
									>
										Privacy Policy
									</a>
								</li>
								<li>
									<a
										href="#"
										className="text-gray-400 hover:text-white transition-colors"
									>
										Terms of Service
									</a>
								</li>
								<li>
									<a
										href="#"
										className="text-gray-400 hover:text-white transition-colors"
									>
										GDPR Compliance
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
					<p>
						&copy; {new Date().getFullYear()} LogShark. All rights
						reserved.
					</p>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
