import { useState } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { getDashboardData } from '../services/dashboard.service';

function ContentDetailModal({ content, onClose }) {
  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="modal-content"
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>×</button>

        <h2 className="modal-title">{content.title}</h2>
        <p className="modal-channel">{content.channel}</p>

        <div className="modal-metrics">
          <div className="modal-metric">
            <span className="metric-label">REACH</span>
            <span className="metric-value">{(content.reach / 1000).toFixed(1)}K</span>
          </div>
          <div className="modal-metric">
            <span className="metric-label">ENGAGEMENT</span>
            <span className="metric-value">{(content.engagement / 1000).toFixed(1)}K</span>
          </div>
          <div className="modal-metric">
            <span className="metric-label">RATE</span>
            <span className="metric-value">{content.rate}%</span>
          </div>
          <div className="modal-metric">
            <span className="metric-label">VIEWS</span>
            <span className="metric-value">{(content.views / 1000).toFixed(0)}K</span>
          </div>
        </div>

        <div className="modal-details">
          <div className="detail-row">
            <span>Type</span>
            <span>{content.type}</span>
          </div>
          <div className="detail-row">
            <span>Published</span>
            <span>{content.date}</span>
          </div>
        </div>

        <p className="modal-insight">
          This piece outperformed your median engagement by {(content.rate * 1.5).toFixed(1)}%.
          Consider creating similar content to maintain momentum.
        </p>
      </motion.div>
    </motion.div>
  );
}

export function ContentWinnersSection() {
  const reduceMotion = useReducedMotion();
  const [selectedContent, setSelectedContent] = useState(null);
  const data = getDashboardData();
  const { contentData } = data;

  return (
    <motion.section
      className="content-winners-section"
      initial={!reduceMotion ? { opacity: 0 } : false}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true, margin: '-100px' }}
    >
      <div className="section-header">
        <h2>CONTENT WINNERS</h2>
        <p>WHAT EARNED THE ROOM</p>
      </div>

      <div className="content-table">
        <div className="table-header">
          <div className="col-post">POST</div>
          <div className="col-channel">CHANNEL</div>
          <div className="col-reach">REACH</div>
          <div className="col-engagement">ENGAGEMENT</div>
          <div className="col-rate">RATE</div>
        </div>

        <div className="table-body">
          {contentData.map((content, index) => (
            <motion.button
              key={content.id}
              className="table-row"
              onClick={() => setSelectedContent(content)}
              initial={!reduceMotion ? { opacity: 0, y: 8 } : false}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ backgroundColor: 'var(--color-elevated)' }}
            >
              <div className="col-post">
                <span className="post-title">{content.title}</span>
              </div>
              <div className="col-channel">
                <span className="channel-badge">{content.channel}</span>
              </div>
              <div className="col-reach">
                {(content.reach / 1000).toFixed(1)}K
              </div>
              <div className="col-engagement">
                {(content.engagement / 1000).toFixed(1)}K
              </div>
              <div className="col-rate">
                <span className="rate-value">{content.rate}%</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedContent && (
          <ContentDetailModal
            content={selectedContent}
            onClose={() => setSelectedContent(null)}
          />
        )}
      </AnimatePresence>
    </motion.section>
  );
}
