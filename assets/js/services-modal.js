/**
 * DREAM PEAK - Services Popup Modal Functionality
 * Strictly implements modal dialogs for the 4 fixed service cards
 * No page reload, full Esc key, click-outside, and close button support
 */

const servicesData = {
  pmc: {
    title: 'PMC – Project Management Consultancy',
    tag: 'Strategic Governance & Oversight',
    image: 'assets/images/services/pmc.jpg',
    lead: 'Dream Peak provides comprehensive Project Management Consultancy (PMC) services that safeguard our clients\' investments, timelines, and architectural standards across India.',
    description: 'Acting as an independent and trusted liaison between clients, architects, vendors, and contractors, our PMC division ensures systematic execution from pre-construction feasibility to final testing and commissioning. We mitigate risk, eliminate cost overruns, and maintain uncompromising quality standards across every milestone.',
    features: [
      'Master Scheduling & Critical Path Tracking',
      'Vendor & Subcontractor Procurement Oversight',
      'On-site Quality Assurance & Material Verification',
      'Cost Control, Quantity Surveying & Budget Tracking',
      'Regulatory & EHS Safety Compliance Protocols',
      'Pre-Handover Snagging & As-Built Documentation'
    ]
  },
  architecture: {
    title: 'Architectural Planning & Engineering',
    tag: 'Visionary Form & Pragmatic Function',
    image: 'assets/images/services/architecture.png',
    lead: 'Our architectural design practice blends striking aesthetic vision with pragmatic engineering to craft timeless, sustainable, and high-performing built environments.',
    description: 'We develop thoughtful architectural solutions for modern retail complexes, corporate office towers, healthcare facilities, and bespoke luxury residential villas. Every project begins with a deep analysis of spatial dynamics, client aspirations, and climatic conditions to deliver landmark architecture.',
    features: [
      'Comprehensive Concept & Master Space Planning',
      'Parametric Facade Design & Exterior Articulation',
      '3D Architectural Visualization & Spatial Renders',
      'Structural, MEP & HVAC Systems Integration',
      'Building Codes, Statutory Approvals & Fire Safety',
      'Sustainable & High-Efficiency Material Specifications'
    ]
  },
  interior: {
    title: 'Luxury Interior Design & Styling',
    tag: 'Bespoke Ambience & Detail-Driven Craft',
    image: 'assets/images/services/interior.jpg',
    lead: 'Dream Peak creates bespoke interior concepts that reflect each client\'s unique identity, delight the senses, and maximize ergonomic functionality.',
    description: 'Specializing in high-traffic retail flagships, corporate workspaces, and private residential retreats, our interior designers curate every texture, tone, and fixture. We balance acoustic comfort, theatrical lighting, custom millwork, and refined finishes into unified, immersive environments.',
    features: [
      'Custom Retail Showroom & Flagship Store Interiors',
      'High-Performance Corporate Workspace Environments',
      'Bespoke Millwork, Metal Fixtures & Joinery Detailing',
      'Architectural Lighting Design & Ambient Control',
      'Acoustic Ceiling Systems & Luxury Wall Claddings',
      'Art Direction, Material Selection & Turnkey Styling'
    ]
  },
  turnkey: {
    title: 'Turnkey Execution & Fit-Out Contracting',
    tag: 'Single-Point Accountability from Bare Shell to Handover',
    image: 'assets/images/services/turnkey.jpg',
    lead: 'Our end-to-end turnkey execution delivers effortless project realization under single-point responsibility—guaranteeing on-time, within-budget completion.',
    description: 'Backed by our dedicated 56/A Rajasthan Industries manufacturing workshop in Vasai (Thane) and experienced project management teams across India, we handle everything from civil demolition to final fixture commissioning. We have successfully rolled out hundreds of retail stores and corporate offices nationwide.',
    features: [
      'Single-Point Contractual Accountability & Reporting',
      'Complete Civil Works, Partitions, Ceilings & Flooring',
      'In-House Fixture Manufacturing at Vasai Workshop',
      'MEP (Mechanical, Electrical, Plumbing) & HVAC Systems',
      'Rapid Pan-India Store Rollouts Across 16+ States',
      'Flawless Turnkey Handover Ready for Immediate Operation'
    ]
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const modalBackdrop = document.getElementById('serviceModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalImage = document.getElementById('modalImage');
  const modalTag = document.getElementById('modalTag');
  const modalTitle = document.getElementById('modalTitle');
  const modalLead = document.getElementById('modalLead');
  const modalDesc = document.getElementById('modalDesc');
  const modalFeatures = document.getElementById('modalFeatures');

  if (!modalBackdrop) return;

  function openModal(serviceKey) {
    const data = servicesData[serviceKey];
    if (!data) return;

    if (modalImage) modalImage.src = data.image;
    if (modalImage) modalImage.alt = data.title;
    if (modalTag) modalTag.textContent = data.tag;
    if (modalTitle) modalTitle.textContent = data.title;
    if (modalLead) modalLead.textContent = data.lead;
    if (modalDesc) modalDesc.textContent = data.description;

    if (modalFeatures) {
      modalFeatures.innerHTML = data.features.map(feat => `
        <li class="modal-feature-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>${feat}</span>
        </li>
      `).join('');
    }

    modalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Bind view details buttons
  const triggers = document.querySelectorAll('[data-service-modal]');
  triggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceKey = btn.getAttribute('data-service-modal');
      openModal(serviceKey);
    });
  });

  // Close triggers
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
      closeModal();
    }
  });
});
