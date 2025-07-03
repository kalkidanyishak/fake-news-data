import React from "react";
import { Button } from "./ui/button";
import { Database } from "lucide-react";

type DataRecord = Record<string, any>;

interface CsvExporterProps {
  data: DataRecord[];
  filename?: string;
  children?: React.ReactNode;
}

/**
 * CSV export React component with UTF-8 BOM support for Amharic and other Unicode.
 */
const CsvExporter: React.FC<CsvExporterProps> = ({
  data,
  filename = "export.csv",
  children,
}) => {
  /**
   * Convert an array of objects into a CSV string.
   */
  const convertToCSV = (items: DataRecord[]): string => {
    if (!items.length) return "";
    const keys = Object.keys(items[0]);

    const escapeValue = (value: any) => {
      const str = String(value ?? "");
      // Wrap in quotes if contains special chars, and escape internal quotes
      return /[",\r\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
    };

    const header = keys.map((key) => escapeValue(key)).join(",");
    const rows = items.map((row) =>
      keys.map((key) => escapeValue(row[key])).join(",")
    );

    return [header, ...rows].join("\r\n");
  };

  /**
   * Trigger browser download of CSV file.
   * Prepends UTF-8 BOM so applications like Excel recognize Unicode (e.g. Amharic) correctly.
   */
  const downloadCSV = () => {
    const csvBody = convertToCSV(data);
    // Add BOM for Excel Unicode support
    const BOM = "\uFEFF";
    const blob = new Blob([BOM + csvBody], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Button
      onClick={downloadCSV}
      type="button"
      variant="outline"
      size="sm"
      className="flex items-center gap-1"
    >
      <Database />
      {children || "Export CSV"}
    </Button>
  );
};

export default CsvExporter;
