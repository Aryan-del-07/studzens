import { useState } from 'react';
import { X, Table2, Layers, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import type { College } from '../data/colleges';
import { categoryColors, formatLakhs } from '../data/colleges';

interface RankedCollege {
  college: College;
  matchScore: number;
  roiScore: number;
  fitLabel: 'Confident' | 'Balanced' | 'Stretch';
}

interface ComparePanelProps {
  items: RankedCollege[];
  onRemove: (id: string) => void;
  onClose: () => void;
}

type ViewMode = 'table' | 'flashcard';

const compareFields: { label: string; key: string; render: (item: RankedCollege) => string }[] = [
  { label: 'City', key: 'city', render: (i) => `${i.college.city}, ${i.college.state}` },
  { label: 'Category', key: 'cat', render: (i) => i.college.primaryCategory },
  { label: 'Tier', key: 'tier', render: (i) => i.college.tier },
  { label: 'Ownership', key: 'own', render: (i) => i.college.ownership },
  { label: 'Annual Fee', key: 'fee', render: (i) => formatLakhs(i.college.annualFeeLpa) },
  { label: 'Avg Package', key: 'pkg', render: (i) => formatLakhs(i.college.avgPackageLpa) },
  { label: 'ROI', key: 'roi', render: (i) => `${i.roiScore.toFixed(1)}x` },
  { label: 'Match Score', key: 'match', render: (i) => `${i.matchScore}%` },
  { label: 'Fit', key: 'fit', render: (i) => i.fitLabel },
  { label: 'Board Comfort', key: 'comfort', render: (i) => `${i.college.boardComfort}%` },
  { label: 'Entrance Exams', key: 'exams', render: (i) => i.college.entranceExams.join(', ') },
  { label: 'Top Programs', key: 'programs', render: (i) => i.college.programs.slice(0, 4).join(', ') },
];

function getBest(items: RankedCollege[], key: string): string {
  if (key === 'fee') return items.reduce((a, b) => a.college.annualFeeLpa < b.college.annualFeeLpa ? a : b).college.id;
  if (key === 'pkg') return items.reduce((a, b) => a.college.avgPackageLpa > b.college.avgPackageLpa ? a : b).college.id;
  if (key === 'roi') return items.reduce((a, b) => a.roiScore > b.roiScore ? a : b).college.id;
  if (key === 'match') return items.reduce((a, b) => a.matchScore > b.matchScore ? a : b).college.id;
  if (key === 'comfort') return items.reduce((a, b) => a.college.boardComfort > b.college.boardComfort ? a : b).college.id;
  return '';
}

export default function ComparePanel({ items, onRemove, onClose }: ComparePanelProps) {
  const [mode, setMode] = useState<ViewMode>('table');
  const [cardIndex, setCardIndex] = useState(0);

  if (items.length === 0) return null;

  return (
    <div className="compare-overlay" onClick={onClose}>
      <div className="compare-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="compare-header">
          <div>
            <p className="eyebrow">Comparison tool</p>
            <h2>Compare {items.length} colleges</h2>
          </div>
          <div className="compare-header-actions">
            <button
              type="button"
              className={`compare-mode-btn ${mode === 'table' ? 'active' : ''}`}
              onClick={() => setMode('table')}
            >
              <Table2 size={16} />
              Table
            </button>
            <button
              type="button"
              className={`compare-mode-btn ${mode === 'flashcard' ? 'active' : ''}`}
              onClick={() => setMode('flashcard')}
            >
              <Layers size={16} />
              Flashcards
            </button>
            <button type="button" className="compare-close" onClick={onClose}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        {mode === 'table' ? (
          <div className="compare-table-wrap">
            <table className="compare-table">
              <thead>
                <tr>
                  <th className="compare-th-label">Attribute</th>
                  {items.map((item) => (
                    <th key={item.college.id}>
                      <div className="compare-college-head">
                        <span
                          className="legend-swatch"
                          style={{ background: categoryColors[item.college.primaryCategory] }}
                        />
                        <span>{item.college.name}</span>
                        <button
                          type="button"
                          className="compare-remove-sm"
                          onClick={() => onRemove(item.college.id)}
                          title="Remove"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {compareFields.map((field) => {
                  const bestId = getBest(items, field.key);
                  return (
                    <tr key={field.key}>
                      <td className="compare-field-label">{field.label}</td>
                      {items.map((item) => (
                        <td
                          key={item.college.id}
                          className={bestId === item.college.id ? 'compare-best' : ''}
                        >
                          {field.render(item)}
                        </td>
                      ))}
                    </tr>
                  );
                })}
                <tr>
                  <td className="compare-field-label">Website</td>
                  {items.map((item) => (
                    <td key={item.college.id}>
                      {item.college.website ? (
                        <a
                          href={item.college.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="compare-link"
                        >
                          <ExternalLink size={12} /> Visit
                        </a>
                      ) : '—'}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div className="compare-flashcard-area">
            <div className="flashcard-nav">
              <button
                type="button"
                disabled={cardIndex <= 0}
                onClick={() => setCardIndex((i) => Math.max(0, i - 1))}
              >
                <ChevronLeft size={20} />
              </button>
              <span className="flashcard-counter">
                {cardIndex + 1} / {items.length}
              </span>
              <button
                type="button"
                disabled={cardIndex >= items.length - 1}
                onClick={() => setCardIndex((i) => Math.min(items.length - 1, i + 1))}
              >
                <ChevronRight size={20} />
              </button>
            </div>

            <div className="flashcard-deck">
              {items.map((item, idx) => {
                const offset = idx - cardIndex;
                const isActive = idx === cardIndex;
                return (
                  <div
                    key={item.college.id}
                    className={`flashcard ${isActive ? 'flashcard-active' : ''}`}
                    style={{
                      transform: `translateX(${offset * 105}%) scale(${isActive ? 1 : 0.92})`,
                      opacity: Math.abs(offset) > 1 ? 0 : isActive ? 1 : 0.5,
                      zIndex: isActive ? 10 : 5 - Math.abs(offset),
                    }}
                  >
                    <div className="flashcard-top">
                      <span
                        className="legend-swatch"
                        style={{ background: categoryColors[item.college.primaryCategory] }}
                      />
                      <h3>{item.college.name}</h3>
                      <button
                        type="button"
                        className="compare-remove-sm"
                        onClick={() => {
                          onRemove(item.college.id);
                          if (cardIndex >= items.length - 1 && cardIndex > 0) setCardIndex(cardIndex - 1);
                        }}
                      >
                        <X size={14} />
                      </button>
                    </div>
                    <p className="flashcard-sub">{item.college.city}, {item.college.state}</p>
                    <p className="flashcard-vibe">{item.college.vibe}</p>

                    <div className="flashcard-grid">
                      {compareFields.map((field) => (
                        <div key={field.key} className="flashcard-field">
                          <span className="flashcard-label">{field.label}</span>
                          <span className="flashcard-value">{field.render(item)}</span>
                        </div>
                      ))}
                    </div>

                    {item.college.website && (
                      <a
                        href={item.college.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="college-website-link"
                        style={{ marginTop: 'auto' }}
                      >
                        <ExternalLink size={14} /> Visit website
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
