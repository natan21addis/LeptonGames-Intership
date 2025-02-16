"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiArrowUp } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-[#252525] pt-12 text-gray-300">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          {/* Social Links and Navigation */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-400 border-l-4 border-red-600 pl-2">
                Follow Us
              </h3>
              <div className="flex gap-4">
                {[FaInstagram, FaLinkedin, FaXTwitter, FaGithub].map((Icon, i) => (
                  <a key={i} href="#" className="hover:text-red-600 transition-colors">
                    <Icon className="h-6 w-6" />
                  </a>
                ))}
              </div>
            </div>

            {/* Rest of the sections remain the same */}
            {['Company', 'Support', 'Contact'].map((section, index) => (
              <div key={section} className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-400 border-l-4 border-red-600 pl-2">
                  {section}
                </h3>
                <ul className="space-y-2">
                  {index === 0 && ['About Us', 'Community', 'Terms and Agreements'].map((item) => (
                    <li key={item}>
                      <a href="#" className="hover:text-red-600 transition-colors">{item}</a>
                    </li>
                  ))}
                  {index === 1 && ['Help', 'FAQ', 'Privacy Policy', 'Feedback'].map((item) => (
                    <li key={item}>
                      <a href="#" className="hover:text-red-600 transition-colors">{item}</a>
                    </li>
                  ))}
                  {index === 2 && [
                    '+251-979202894', '@A_natan', 
                    'Natanaddis', 'nataddis21@gmail.com',
                    'https://github.com/natan21addis', 
                  ].map((item) => (
                    <li key={item}>
                      <a href="#" className="hover:text-red-600 transition-colors text-sm">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter Form */}
          <div className="space-y-6 md:max-w-[350px]">
            <h3 className="text-lg font-semibold text-gray-400 border-l-4 border-red-600 pl-2">
              Get Update
            </h3>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="full-name">Full Name</Label>
                <Input id="full-name" placeholder="Full Name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Email" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {['Ethiopia', 'USA', 'UAE', 'Portugal', 'Other'].map((country) => (
                      <SelectItem key={country} value={country.toLowerCase()}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button 
                type="submit"
                variant="outline"
                className="w-full border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Back to Top */}
        <div className="mt-12 flex justify-center">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-red-600/10 hover:bg-red-600/20"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <FiArrowUp className="h-6 w-6 text-red-600" />
          </Button>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-700 py-8 text-center text-gray-400">
          <span>Copyright&copy; 2024 | All Rights Reserved</span>
        </div>
      </div>
    </footer>
  )
}