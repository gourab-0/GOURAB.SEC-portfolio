import { motion, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';

export default function SectionReveal({ children, className = '', id, style, ...props }) {
    const ref = useRef(null);
    const reduceMotion = useReducedMotion();

    return (
        <motion.section
            ref={ref}
            id={id}
            className={className}
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.04 }}
            transition={{ duration: reduceMotion ? 0 : 0.35, ease: 'easeOut' }}
            style={style}
            {...props}
        >
            {children}
        </motion.section>
    );
}
