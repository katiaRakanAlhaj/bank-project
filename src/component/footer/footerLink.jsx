import React from "react";
const FooterLink = ({ href, icon }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-x-2"
  >
    {icon}
  </a>
);
export default FooterLink;
