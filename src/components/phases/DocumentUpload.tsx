import { motion } from 'framer-motion';
import { ArrowLeft, Upload, FileText, DollarSign, Package, Megaphone, FolderOpen, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/appStore';
import { useState } from 'react';

interface DocumentCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  examples: string[];
  files: File[];
}

const initialCategories: DocumentCategory[] = [
  {
    id: 'brand',
    title: 'Marca',
    description: 'Documentos de identidad y estrategia de marca',
    icon: FileText,
    examples: ['Misión y visión', 'Brief creativo', 'Mensajes clave', 'Guía de marca', 'Estrategias de marca'],
    files: [],
  },
  {
    id: 'financial',
    title: 'Financieros',
    description: 'Información financiera y presupuestos',
    icon: DollarSign,
    examples: ['Presupuestos', 'Gastos y costos', 'Ingresos', 'Balance sheet', 'Estado de resultados'],
    files: [],
  },
  {
    id: 'product',
    title: 'Producto',
    description: 'Documentación de producto y pricing',
    icon: Package,
    examples: ['Product roadmap', 'Pricing strategy', 'Feature list', 'Análisis competitivo de producto'],
    files: [],
  },
  {
    id: 'media',
    title: 'Media',
    description: 'Canales y estrategias de medios',
    icon: Megaphone,
    examples: ['Media channels', 'Media strategies', 'Media mix', 'Performance reports', 'Social media analytics'],
    files: [],
  },
  {
    id: 'other',
    title: 'Otros',
    description: 'Cualquier otro documento relevante',
    icon: FolderOpen,
    examples: ['Investigación de mercado', 'Análisis de audiencia', 'KPIs actuales', 'Planes anteriores'],
    files: [],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
  exit: { opacity: 0, x: -50 },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export function DocumentUpload() {
  const { goBack, advanceToDashboard, companyType } = useAppStore();
  const [categories, setCategories] = useState<DocumentCategory[]>(initialCategories);

  const totalSteps = companyType === 'enterprise' ? 4 : 5;
  const currentStep = totalSteps;

  const totalFiles = categories.reduce((sum, cat) => sum + cat.files.length, 0);

  const handleFileChange = (categoryId: string, fileList: FileList | null) => {
    if (!fileList) return;
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? { ...cat, files: [...cat.files, ...Array.from(fileList)] }
          : cat
      )
    );
  };

  const removeFile = (categoryId: string, fileIndex: number) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? { ...cat, files: cat.files.filter((_, i) => i !== fileIndex) }
          : cat
      )
    );
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="min-h-screen flex flex-col px-4 py-8"
    >
      {/* Progress Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center mb-6"
      >
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="text-primary font-medium">Paso {currentStep}</span>
          <span>de</span>
          <span>{totalSteps}</span>
        </div>
        <div className="flex gap-1 mt-2">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`h-1 w-8 rounded-full transition-colors ${
                i < currentStep ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-4 mb-2"
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={goBack}
          className="hover:bg-secondary"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
            Sube tus documentos
          </h1>
          <p className="text-muted-foreground text-sm">
            Sube archivos relevantes para generar el mejor plan de marketing posible
          </p>
        </div>
      </motion.div>

      {/* Info Banner */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="max-w-4xl mx-auto w-full mb-8 mt-4"
      >
        <div className="bg-accent/50 border border-primary/20 rounded-lg p-4 flex items-start gap-3">
          <Upload className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm text-foreground font-medium mb-1">
              Mientras más documentos subas, mejor será tu plan
            </p>
            <p className="text-xs text-muted-foreground">
              Puedes subir PDFs, Word, Excel, PowerPoint o imágenes. Este paso es opcional — puedes continuar sin subir documentos y agregarlos después.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Document Categories Grid */}
      <motion.div
        variants={containerVariants}
        className="max-w-4xl mx-auto w-full flex-1"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <motion.div
              key={category.id}
              variants={cardVariants}
              className="card-interactive p-5 flex flex-col"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <category.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-sm font-semibold text-foreground">
                    {category.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">{category.description}</p>
                </div>
              </div>

              {/* Examples */}
              <div className="mb-3 flex flex-wrap gap-1">
                {category.examples.map((example, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 bg-secondary rounded text-[10px] text-muted-foreground"
                  >
                    {example}
                  </span>
                ))}
              </div>

              {/* Uploaded Files */}
              {category.files.length > 0 && (
                <div className="mb-3 space-y-1">
                  {category.files.map((file, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 bg-secondary/50 rounded px-2 py-1"
                    >
                      <CheckCircle2 className="w-3 h-3 text-primary flex-shrink-0" />
                      <span className="text-xs text-foreground truncate flex-1">
                        {file.name}
                      </span>
                      <button
                        onClick={() => removeFile(category.id, idx)}
                        className="text-xs text-muted-foreground hover:text-destructive transition-colors"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Upload Button */}
              <label className="mt-auto cursor-pointer">
                <div className="border-2 border-dashed border-border rounded-lg p-3 text-center hover:border-primary/50 hover:bg-accent/30 transition-colors">
                  <Upload className="w-4 h-4 mx-auto text-muted-foreground mb-1" />
                  <span className="text-xs text-muted-foreground">
                    Subir archivos
                  </span>
                </div>
                <input
                  type="file"
                  multiple
                  className="hidden"
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.csv"
                  onChange={(e) => handleFileChange(category.id, e.target.files)}
                />
              </label>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Footer Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col items-center gap-3 mt-8"
      >
        {totalFiles > 0 && (
          <p className="text-sm text-muted-foreground">
            {totalFiles} archivo{totalFiles !== 1 ? 's' : ''} seleccionado{totalFiles !== 1 ? 's' : ''}
          </p>
        )}
        <div className="flex gap-4">
          <Button variant="outline" onClick={goBack} className="px-6">
            Volver
          </Button>
          <Button
            onClick={advanceToDashboard}
            className="btn-primary-gradient px-8 gap-2"
          >
            {totalFiles > 0 ? 'Continuar' : 'Omitir por ahora'}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}