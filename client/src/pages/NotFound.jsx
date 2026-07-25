import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function NotFound() {
  return (
    <section className="flex min-h-[80vh] items-center justify-center px-4 py-16 text-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg"
      >
        <motion.h1 
          className="text-9xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          404
        </motion.h1>
        <h2 className="mt-8 text-3xl font-bold text-slate-900 dark:text-slate-100">Page not found</h2>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. Perhaps you&apos;ve mistyped the URL?
        </p>
        <motion.div 
          className="mt-10"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link 
            to="/" 
            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-8 py-3.5 text-base font-medium text-white shadow-lg transition-colors hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
          >
            Go back home
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default NotFound;
