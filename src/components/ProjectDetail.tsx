import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useDialog } from '../hooks/useDialog';
import { DURATION, EASE } from '../styles/motion';
import { IconX } from './ui/Icons';
import type { Project } from '../types';

interface ProjectDetailProps {
  project: Project;
  onClose: () => void;
}

/**
 * Expanded project notes: opens with a smooth layout transition, traps focus,
 * closes on Esc / backdrop and restores focus to the launching button.
 */
export default function ProjectDetail({ project, onClose }: ProjectDetailProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  useDialog({ open: true, onClose, dialogRef });

  return (
    <motion.div
      className="detail"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: DURATION.fast, ease: EASE }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.div
        className="detail__panel"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-detail-title"
        tabIndex={-1}
        initial={{ opacity: 0, y: 36, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24 }}
        transition={{ duration: DURATION.base, ease: EASE }}
      >
        <header className="detail__head">
          <div>
            <p className="detail__year">
              {project.year} · {project.role}
            </p>
            <h3 id="project-detail-title" className="detail__title">
              {project.name}
            </h3>
          </div>
          <button
            type="button"
            className="icon-btn detail__close"
            data-dialog-focus
            aria-label="Close project detail"
            onClick={onClose}
          >
            <IconX />
          </button>
        </header>

        <div className="detail__gallery">
          {project.images.map((src, index) => (
            <img
              key={src}
              className="detail__img"
              src={src}
              alt={`${project.name} — plate ${index + 1}`}
              width="720"
              height="540"
              loading="lazy"
              decoding="async"
            />
          ))}
        </div>

        <p className="detail__desc">{project.description}</p>

        <ul className="detail__points">
          {project.details.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}
