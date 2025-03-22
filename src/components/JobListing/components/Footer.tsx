import React from "react"

interface FooterLink {
  text: string
  url: string
}

interface FooterProps {
  title?: string
  description?: string
  links?: FooterLink[][]
}

const Footer: React.FC<FooterProps> = ({
                                         title = "Subscribe to our newsletter",
                                         description = "The latest job opportunities and career tips, weekly in your inbox.",
                                         links = [],
                                       }) => {
  return (
      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="grid grid-cols-2 gap-8 xl:col-span-2">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                {Array.isArray(links) &&
                    links.map((section, index) =>
                        Array.isArray(section) && section.length > 0 ? (
                            <div key={index} className="mt-12 md:mt-0">
                              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                                {section[0]?.text || "Section"}
                              </h3>
                              <ul className="mt-4 space-y-4">
                                {section.map((link, linkIndex) => (
                                    <li key={linkIndex}>
                                      <a href={link.url} className="hover:text-gray-300">
                                        {link.text}
                                      </a>
                                    </li>
                                ))}
                              </ul>
                            </div>
                        ) : null
                    )}
              </div>
            </div>

            {/* Newsletter Section */}
            <div className="mt-8 xl:mt-0">
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                {title}
              </h3>
              <p className="mt-4 text-base text-gray-300">{description}</p>
              <form className="mt-4 sm:flex sm:max-w-md">
                <label htmlFor="email-address" className="sr-only">Email address</label>
                <input
                    type="email"
                    name="email-address"
                    id="email-address"
                    autoComplete="email"
                    required
                    className="appearance-none min-w-0 w-full bg-white border border-transparent rounded-md py-2 px-4 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white focus:border-white focus:placeholder-gray-400"
                    placeholder="Enter your email"
                />
                <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                  <button
                      type="submit"
                      className="w-full bg-blue-600 border border-transparent rounded-md py-2 px-4 flex items-center justify-center text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="mt-8 border-t border-gray-700 pt-8">
            <p className="text-base text-gray-400 xl:text-center">
              &copy; {new Date().getFullYear()} JobBoard, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
  )
}

export default Footer
