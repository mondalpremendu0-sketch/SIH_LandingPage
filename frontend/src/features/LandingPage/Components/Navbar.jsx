import { ArrowUpRight, Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Button } from "../../../components/Button";
import { Container } from "../../../components/Container";
import { ThemeToggle } from "../../../components/ThemeToggle";

const navigation = ["Platform", "Intelligence", "Network", "Developers"];
const mobileBreakpoint = 767;

export function Navbar({ theme, onThemeChange }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Platform");
  const [isScrolled, setIsScrolled] = useState(false);
  const reduceMotion = useReducedMotion();
  const menuButtonRef = useRef(null);
  const drawerRef = useRef(null);
  const headerRef = useRef(null);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    menuButtonRef.current?.focus();
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    drawerRef.current?.querySelector("a")?.focus();

    const closeOnEscape = (event) => {
      if (event.key === "Escape") closeMobileMenu();
    };
    const closeOnResize = () => {
      if (window.innerWidth > mobileBreakpoint) closeMobileMenu();
    };
    const mobileViewport = window.matchMedia(
      `(max-width: ${mobileBreakpoint}px)`,
    );
    const closeOnBreakpointChange = (event) => {
      if (!event.matches) closeMobileMenu();
    };
    const resizeObserver = new ResizeObserver(([entry]) => {
      if (entry.contentRect.width > mobileBreakpoint) closeMobileMenu();
    });
    if (headerRef.current) resizeObserver.observe(headerRef.current);
    document.addEventListener("keydown", closeOnEscape);
    window.addEventListener("resize", closeOnResize);
    mobileViewport.addEventListener("change", closeOnBreakpointChange);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("resize", closeOnResize);
      mobileViewport.removeEventListener("change", closeOnBreakpointChange);
      resizeObserver.disconnect();
    };
  }, [isMobileMenuOpen]);

  const handleNavigation = (item) => {
    setActiveItem(item);
    closeMobileMenu();
  };

  const toggleMobileMenu = () => {
    if (isMobileMenuOpen) {
      closeMobileMenu();
      return;
    }
    setIsMobileMenuOpen(true);
  };

  const entrance = (delay) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: reduceMotion ? 0.01 : 0.68,
      delay: reduceMotion ? 0 : delay,
      ease: [0.22, 1, 0.36, 1],
    },
  });

  return (
    <header
      ref={headerRef}
      className={`site-header ${isScrolled ? "is-scrolled" : ""}`}
    >
      <Container className="navbar">
        <motion.a
          className="brand"
          href="/"
          aria-label="Nexus home"
          {...entrance(0)}
        >
          <span className="brand-name">NEXUS</span>
          <span className="brand-label">SOCIAL INTELLIGENCE</span>
        </motion.a>

        <motion.nav
          className="primary-nav"
          aria-label="Primary navigation"
          {...entrance(0.06)}
        >
          {navigation.map((item) => (
            <a
              aria-current={activeItem === item ? "page" : undefined}
              className={activeItem === item ? "is-active" : ""}
              href={`#${item.toLowerCase()}`}
              key={item}
              onClick={() => handleNavigation(item)}
            >
              {item}
              {activeItem === item && (
                <motion.span
                  className="nav-indicator"
                  layoutId="active-nav"
                  transition={{
                    duration: reduceMotion ? 0.01 : 0.36,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              )}
            </a>
          ))}
        </motion.nav>

        <div className="navbar-actions">
          <motion.a
            className="explore-link"
            href="/dashboard"
            {...entrance(0.12)}
          >
            Explore platform{" "}
            <ArrowUpRight
              aria-hidden="true"
              className="explore-arrow"
              size={15}
            />
          </motion.a>
          <motion.div {...entrance(0.12)}>
            <ThemeToggle theme={theme} onChange={onThemeChange} />
          </motion.div>
          <Button
            ref={menuButtonRef}
            aria-controls="mobile-navigation"
            aria-expanded={isMobileMenuOpen}
            aria-label={
              isMobileMenuOpen ? "Close navigation" : "Open navigation"
            }
            className="menu-button"
            onClick={toggleMobileMenu}
            variant="quiet"
          >
            {isMobileMenuOpen ? (
              <X aria-hidden="true" size={19} />
            ) : (
              <Menu aria-hidden="true" size={19} />
            )}
          </Button>
        </div>
      </Container>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.button
              aria-label="Dismiss navigation drawer"
              className="mobile-nav-overlay"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={closeMobileMenu}
              type="button"
            />
            <motion.nav
              id="mobile-navigation"
              ref={drawerRef}
              animate={{ opacity: 1, y: 0 }}
              className="mobile-nav"
              exit={{ opacity: 0, y: -8 }}
              initial={{ opacity: 0, y: -8 }}
              transition={{
                duration: reduceMotion ? 0.01 : 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              aria-label="Mobile navigation"
            >
              {navigation.map((item, index) => (
                <motion.a
                  animate={{ opacity: 1, y: 0 }}
                  aria-current={activeItem === item ? "page" : undefined}
                  initial={reduceMotion ? false : { opacity: 0, y: -6 }}
                  href={`#${item.toLowerCase()}`}
                  key={item}
                  onClick={() => handleNavigation(item)}
                  transition={{
                    duration: reduceMotion ? 0.01 : 0.38,
                    delay: reduceMotion ? 0 : index * 0.065,
                  }}
                >
                  {item}
                </motion.a>
              ))}
              <motion.a
                className="mobile-explore"
                href="/dashboard"
                onClick={closeMobileMenu}
              >
                Explore platfor <ArrowUpRight aria-hidden="true" size={15} />
              </motion.a>
              
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
