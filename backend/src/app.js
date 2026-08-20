const express = require('express');
const cors = require('cors');
const caseRoutes = require('./routes/caseRoutes');
const judgmentRoutes = require('./routes/judgmentRoutes');
const legalSectionRoutes = require('./routes/legalSectionRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/cases', caseRoutes);
app.use('/api/judgments', judgmentRoutes);
app.use('/api/legal-sections', legalSectionRoutes);

// Health Check Endpoint (Section 471 Spec)
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    system: 'RESEARCH Legal Precedent API',
    timestamp: new Date().toISOString(),
    ai_service_bridge: 'Ready for Python FastAPI REST connection'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: `Cannot ${req.method} ${req.originalUrl}` });
});

// Global Error handler
app.use((err, req, res, next) => {
  console.error('[RESEARCH Backend Error]', err);
  res.status(500).json({ error: 'Internal legal repository database error', details: err.message });
});

module.exports = app;
