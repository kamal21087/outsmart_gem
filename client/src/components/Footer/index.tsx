const Footer = () => {
  return (
    <footer className="footer">
      <p>
        &copy; {new Date().getFullYear()} OutSmart Gem. All rights reserved.{' '}
        <a href="/privacy-policy">Privacy Policy</a>
      </p>
    </footer>
  );
};

export default Footer;
