// src/components/MinimalAmharicMarkdownViewer.tsx

import React from 'react';
import ReactMarkdown from 'react-markdown';

// --- Props Interface ---
interface MinimalAmharicMarkdownViewerProps {
  /** The Amharic Markdown string to render. */
  markdownContent: string;
}

// --- Default Amharic Font Stack ---
// You should ensure these fonts are available (e.g., via CSS @font-face or system installation)
const AMHARIC_FONT_FAMILY =
  "'Noto Sans Ethiopic', 'Nyala', 'Abyssinica SIL', 'Ethiopia Jiret', 'Visual Geez', 'Power Geez', 'Geez Unicode', sans-serif";

/**
 * A minimal React component to render Amharic Markdown text.
 * It applies a default Amharic font stack via inline styles.
 */
const MinimalAmharicMarkdownViewer: React.FC<MinimalAmharicMarkdownViewerProps> = ({
  markdownContent,
}) => {
  // --- Inline styles to apply Amharic font and basic readability ---
  const viewerStyle: React.CSSProperties = {
    fontFamily: AMHARIC_FONT_FAMILY,
    lineHeight: 1.8, // Amharic script often benefits from slightly more line height
    // You can add other minimal base styles here if necessary
  };

  // If there's no content, you might want to render nothing or a placeholder.
  // For true minimalism, rendering null when content is empty or undefined is common.
  if (!markdownContent) {
    return null;
  }

  return (
    <div style={viewerStyle}>
      <ReactMarkdown>{markdownContent}</ReactMarkdown>
    </div>
  );
};

export default MinimalAmharicMarkdownViewer;