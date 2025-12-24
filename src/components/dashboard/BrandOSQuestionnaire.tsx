import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Check, Building, Users, DollarSign, Target, FileUp, File, X, FileText, Wrench, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAppStore, FlowType } from '@/store/appStore';
import { DocumentUploadPaywall } from './DocumentUploadPaywall';
import { toast } from 'sonner';

// Define different question sets for each flow type
const completeSteps = [
  { id: 1, title: 'Información General', icon: Building },
  { id: 2, title: 'Modelo de Negocio', icon: Users },
  { id: 3, title: 'Finanzas y Metas', icon: DollarSign },
  { id: 4, title: 'Audiencia Objetivo', icon: Target },
];

const strategicSteps = [
  { id: 1, title: 'Plan Principal', icon: FileText },
  { id: 2, title: 'Objetivos Estratégicos', icon: Target },
  { id: 3, title: 'Recursos y Capacidades', icon: DollarSign },
];

const tacticSteps = [
  { id: 1, title: 'Contexto Actual', icon: Building },
  { id: 2, title: 'Tácticas Prioritarias', icon: Wrench },
];

const flowLabels: Record<string, { label: string; description: string; icon: typeof FileText }> = {
  completo: { label: 'Flujo Completo', description: 'Plan desde cero (Q0-Q58)', icon: FileText },
  estrategico: { label: 'Flujo Estratégico', description: 'Estrategias basadas en tu plan', icon: Target },
  tactico: { label: 'Flujo Táctico', description: 'Tácticas de implementación', icon: Wrench },
};

const getStepsForFlow = (flowType: FlowType) => {
  switch (flowType) {
    case 'estrategico':
      return strategicSteps;
    case 'tactico':
      return tacticSteps;
    default:
      return completeSteps;
  }
};

export function BrandOSQuestionnaire() {
  const {
    questionnaireStep,
    setQuestionnaireStep,
    questionnaireData,
    updateQuestionnaireData,
    completeQuestionnaire,
    questionnaireCompleted,
    hasDocumentAddon,
    flowType,
    planType,
  } = useAppStore();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Get steps based on flow type
  const steps = getStepsForFlow(flowType);
  const totalSteps = steps.length;
  const currentFlowInfo = flowType ? flowLabels[flowType] : flowLabels.completo;
  const FlowIcon = currentFlowInfo.icon;

  const handleNext = () => {
    if (questionnaireStep < totalSteps) {
      setQuestionnaireStep(questionnaireStep + 1);
    } else {
      completeQuestionnaire();
      setIsCollapsed(true);
    }
  };

  const handleBack = () => {
    if (questionnaireStep > 1) {
      setQuestionnaireStep(questionnaireStep - 1);
    }
  };

  const handleUploadClick = () => {
    if (hasDocumentAddon) {
      fileInputRef.current?.click();
    } else {
      setShowPaywall(true);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setUploadedFiles(prev => [...prev, ...files]);
      toast.success(`${files.length} documento(s) subido(s). Analizando con IA...`);
      
      // Simulate auto-fill after upload with comprehensive mock data
      setTimeout(() => {
        updateQuestionnaireData({
          name: 'TechVentures Latam S.A.',
          website: 'https://techventures.lat',
          socialMedia: '@techventureslatam',
          industry: 'tech',
          reach: 'regional',
          businessType: 'services',
          monthlyCustomers: '250',
          salesApproach: 'subscription',
          grossRevenue: '$180,000',
          netProfitMargin: '35%',
          marketingBudget: '$15,000',
          businessGoals: 'Expandir operaciones a 3 países adicionales en LATAM, aumentar MRR en 40% y consolidar posición como líder en soluciones SaaS para PyMEs.',
          idealCustomer: 'PyMEs con 20-100 empleados en sectores de retail, servicios profesionales y manufactura que buscan digitalizar sus operaciones.',
          problemsSolved: 'Falta de herramientas digitales accesibles, procesos manuales ineficientes, dificultad para escalar operaciones sin aumentar costos.',
        });
        toast.success('¡Formulario auto-completado exitosamente con IA!');
      }, 2500);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handlePaywallSuccess = () => {
    setShowPaywall(false);
    toast.success('¡Add-on activado! Ahora puedes subir documentos');
    setTimeout(() => {
      fileInputRef.current?.click();
    }, 500);
  };

  if (questionnaireCompleted && isCollapsed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-success-light border border-success/30 rounded-xl p-4 max-w-md"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-success flex items-center justify-center">
            <Check className="w-4 h-4 text-white" />
          </div>
          <div>
            <h4 className="font-medium text-foreground text-sm">Cuestionario BrandOS Completado</h4>
            <p className="text-xs text-muted-foreground">
              {questionnaireData.name || 'Tu empresa'} • {questionnaireData.industry || 'Industria'}
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border rounded-xl shadow-lg max-w-2xl overflow-hidden"
      >
        <div className="bg-gradient-to-r from-primary to-purple-600 p-4 text-primary-foreground">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-heading font-semibold text-lg">Cuestionario BrandOS</h3>
              <p className="text-sm opacity-90">Paso {questionnaireStep} de {totalSteps}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleUploadClick}
              className="bg-white/20 hover:bg-white/30 text-white gap-2"
            >
              <FileUp className="w-4 h-4" />
              Auto-completar
            </Button>
          </div>
          {/* Flow Type Badge */}
          <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2">
            <FlowIcon className="w-4 h-4" />
            <div className="flex-1">
              <span className="font-medium text-sm">{currentFlowInfo.label}</span>
              <span className="text-xs opacity-75 ml-2">• {currentFlowInfo.description}</span>
            </div>
            {planType && (
              <span className="text-xs bg-white/20 px-2 py-0.5 rounded">
                {planType === 'entry' ? 'Entry Plan' : planType === 'enterprise' ? 'Enterprise' : 'Top Consultancy'}
              </span>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* Uploaded Files */}
        {uploadedFiles.length > 0 && (
          <div className="px-4 py-2 bg-secondary/30 border-b border-border">
            <div className="flex flex-wrap gap-2">
              {uploadedFiles.map((file, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 bg-background rounded-lg px-3 py-1.5 text-sm"
                >
                  <File className="w-4 h-4 text-primary" />
                  <span className="text-foreground truncate max-w-[150px]">{file.name}</span>
                  <button
                    onClick={() => removeFile(idx)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Progress Steps */}
        <div className="px-4 py-3 border-b border-border bg-secondary/30">
          <div className="flex items-center justify-between">
            {steps.map((step, idx) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    questionnaireStep >= step.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {questionnaireStep > step.id ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <step.icon className="w-4 h-4" />
                  )}
                </div>
                {idx < steps.length - 1 && (
                  <div
                    className={`w-8 md:w-16 h-0.5 mx-1 transition-colors ${
                      questionnaireStep > step.id ? 'bg-primary' : 'bg-muted'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            {/* FLUJO COMPLETO - Step 1 (or default if no flow selected) */}
            {(flowType === 'completo' || flowType === null) && questionnaireStep === 1 && (
              <motion.div
                key="completo-step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h4 className="font-heading font-semibold text-foreground mb-4">
                  Información General
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre de la empresa</Label>
                    <Input
                      id="name"
                      value={questionnaireData.name}
                      onChange={(e) => updateQuestionnaireData({ name: e.target.value })}
                      placeholder="Tu empresa"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Sitio web</Label>
                    <Input
                      id="website"
                      value={questionnaireData.website}
                      onChange={(e) => updateQuestionnaireData({ website: e.target.value })}
                      placeholder="https://ejemplo.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="socialMedia">Redes sociales</Label>
                  <Input
                    id="socialMedia"
                    value={questionnaireData.socialMedia}
                    onChange={(e) => updateQuestionnaireData({ socialMedia: e.target.value })}
                    placeholder="@tuempresa"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Industria</Label>
                    <Select
                      value={questionnaireData.industry}
                      onValueChange={(value) => updateQuestionnaireData({ industry: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona industria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tech">Tecnología</SelectItem>
                        <SelectItem value="retail">Retail</SelectItem>
                        <SelectItem value="services">Servicios</SelectItem>
                        <SelectItem value="manufacturing">Manufactura</SelectItem>
                        <SelectItem value="healthcare">Salud</SelectItem>
                        <SelectItem value="finance">Finanzas</SelectItem>
                        <SelectItem value="other">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Alcance</Label>
                    <Select
                      value={questionnaireData.reach}
                      onValueChange={(value) => updateQuestionnaireData({ reach: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona alcance" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="local">Local</SelectItem>
                        <SelectItem value="regional">Regional</SelectItem>
                        <SelectItem value="national">Nacional</SelectItem>
                        <SelectItem value="global">Global</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </motion.div>
            )}

            {/* FLUJO COMPLETO - Step 2 */}
            {(flowType === 'completo' || flowType === null) && questionnaireStep === 2 && (
              <motion.div
                key="completo-step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h4 className="font-heading font-semibold text-foreground mb-4">
                  Modelo de Negocio
                </h4>

                <div className="space-y-3">
                  <Label>¿Qué ofreces?</Label>
                  <RadioGroup
                    value={questionnaireData.businessType}
                    onValueChange={(value) => updateQuestionnaireData({ businessType: value })}
                    className="flex flex-col gap-2"
                  >
                    <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-secondary/50 transition-colors">
                      <RadioGroupItem value="products" id="products" />
                      <Label htmlFor="products" className="cursor-pointer flex-1">
                        Productos físicos
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-secondary/50 transition-colors">
                      <RadioGroupItem value="services" id="services" />
                      <Label htmlFor="services" className="cursor-pointer flex-1">
                        Servicios
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-secondary/50 transition-colors">
                      <RadioGroupItem value="hybrid" id="hybrid" />
                      <Label htmlFor="hybrid" className="cursor-pointer flex-1">
                        Híbrido (productos + servicios)
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customers">Clientes promedio mensuales</Label>
                  <Input
                    id="customers"
                    type="number"
                    value={questionnaireData.monthlyCustomers}
                    onChange={(e) =>
                      updateQuestionnaireData({ monthlyCustomers: e.target.value })
                    }
                    placeholder="Ej: 100"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Enfoque de ventas</Label>
                  <Select
                    value={questionnaireData.salesApproach}
                    onValueChange={(value) => updateQuestionnaireData({ salesApproach: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona enfoque" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="longterm">Contratos a largo plazo</SelectItem>
                      <SelectItem value="onetime">Compras puntuales</SelectItem>
                      <SelectItem value="subscription">Suscripción</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </motion.div>
            )}

            {/* FLUJO COMPLETO - Step 3 */}
            {(flowType === 'completo' || flowType === null) && questionnaireStep === 3 && (
              <motion.div
                key="completo-step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h4 className="font-heading font-semibold text-foreground mb-4">
                  Finanzas y Metas
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="revenue">Ingresos brutos actuales (USD)</Label>
                    <Input
                      id="revenue"
                      value={questionnaireData.grossRevenue}
                      onChange={(e) => updateQuestionnaireData({ grossRevenue: e.target.value })}
                      placeholder="Ej: $50,000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="margin">Margen de ganancia neta (%)</Label>
                    <Input
                      id="margin"
                      value={questionnaireData.netProfitMargin}
                      onChange={(e) =>
                        updateQuestionnaireData({ netProfitMargin: e.target.value })
                      }
                      placeholder="Ej: 20%"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget">Presupuesto de marketing mensual</Label>
                  <Input
                    id="budget"
                    value={questionnaireData.marketingBudget}
                    onChange={(e) =>
                      updateQuestionnaireData({ marketingBudget: e.target.value })
                    }
                    placeholder="Ej: $5,000"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="goals">Objetivos de negocio</Label>
                  <Textarea
                    id="goals"
                    value={questionnaireData.businessGoals}
                    onChange={(e) => updateQuestionnaireData({ businessGoals: e.target.value })}
                    placeholder="Describe tus principales objetivos..."
                    rows={3}
                  />
                </div>
              </motion.div>
            )}

            {/* FLUJO COMPLETO - Step 4 */}
            {(flowType === 'completo' || flowType === null) && questionnaireStep === 4 && (
              <motion.div
                key="completo-step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h4 className="font-heading font-semibold text-foreground mb-4">
                  Audiencia Objetivo
                </h4>

                <div className="space-y-2">
                  <Label htmlFor="customer">Descripción de tu cliente ideal</Label>
                  <Textarea
                    id="customer"
                    value={questionnaireData.idealCustomer}
                    onChange={(e) =>
                      updateQuestionnaireData({ idealCustomer: e.target.value })
                    }
                    placeholder="Describe a tu cliente ideal: edad, ubicación, intereses, comportamientos..."
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="problems">Problemas que resuelve tu producto/servicio</Label>
                  <Textarea
                    id="problems"
                    value={questionnaireData.problemsSolved}
                    onChange={(e) =>
                      updateQuestionnaireData({ problemsSolved: e.target.value })
                    }
                    placeholder="¿Qué problemas específicos resuelve tu oferta?"
                    rows={4}
                  />
                </div>
              </motion.div>
            )}

            {/* FLUJO ESTRATÉGICO - Step 1: Plan Principal */}
            {flowType === 'estrategico' && questionnaireStep === 1 && (
              <motion.div
                key="estrategico-step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h4 className="font-heading font-semibold text-foreground mb-4">
                  Plan Principal Existente
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Ya tienes un plan de negocio. Cuéntanos sobre él para crear estrategias alineadas.
                </p>

                <div className="space-y-2">
                  <Label htmlFor="currentPlan">Describe tu plan de negocio actual</Label>
                  <Textarea
                    id="currentPlan"
                    value={questionnaireData.businessGoals}
                    onChange={(e) => updateQuestionnaireData({ businessGoals: e.target.value })}
                    placeholder="Resumen de tu visión, misión y estrategia principal actual..."
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currentPosition">¿Cuál es tu posición actual en el mercado?</Label>
                  <Textarea
                    id="currentPosition"
                    value={questionnaireData.idealCustomer}
                    onChange={(e) => updateQuestionnaireData({ idealCustomer: e.target.value })}
                    placeholder="Describe tu participación de mercado, ventajas competitivas, diferenciadores..."
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Industria</Label>
                    <Select
                      value={questionnaireData.industry}
                      onValueChange={(value) => updateQuestionnaireData({ industry: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona industria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tech">Tecnología</SelectItem>
                        <SelectItem value="retail">Retail</SelectItem>
                        <SelectItem value="services">Servicios</SelectItem>
                        <SelectItem value="manufacturing">Manufactura</SelectItem>
                        <SelectItem value="healthcare">Salud</SelectItem>
                        <SelectItem value="finance">Finanzas</SelectItem>
                        <SelectItem value="other">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Alcance actual</Label>
                    <Select
                      value={questionnaireData.reach}
                      onValueChange={(value) => updateQuestionnaireData({ reach: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona alcance" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="local">Local</SelectItem>
                        <SelectItem value="regional">Regional</SelectItem>
                        <SelectItem value="national">Nacional</SelectItem>
                        <SelectItem value="global">Global</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </motion.div>
            )}

            {/* FLUJO ESTRATÉGICO - Step 2: Objetivos Estratégicos */}
            {flowType === 'estrategico' && questionnaireStep === 2 && (
              <motion.div
                key="estrategico-step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h4 className="font-heading font-semibold text-foreground mb-4">
                  Objetivos Estratégicos
                </h4>

                <div className="space-y-2">
                  <Label htmlFor="strategicGoals">¿Qué objetivos estratégicos quieres alcanzar?</Label>
                  <Textarea
                    id="strategicGoals"
                    value={questionnaireData.problemsSolved}
                    onChange={(e) => updateQuestionnaireData({ problemsSolved: e.target.value })}
                    placeholder="Describe 3-5 objetivos estratégicos clave para los próximos 12-18 meses..."
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Prioridad principal</Label>
                  <RadioGroup
                    value={questionnaireData.businessType}
                    onValueChange={(value) => updateQuestionnaireData({ businessType: value })}
                    className="flex flex-col gap-2"
                  >
                    <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-secondary/50 transition-colors">
                      <RadioGroupItem value="growth" id="growth" />
                      <Label htmlFor="growth" className="cursor-pointer flex-1">
                        Crecimiento de ingresos
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-secondary/50 transition-colors">
                      <RadioGroupItem value="market" id="market" />
                      <Label htmlFor="market" className="cursor-pointer flex-1">
                        Expansión de mercado
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-secondary/50 transition-colors">
                      <RadioGroupItem value="efficiency" id="efficiency" />
                      <Label htmlFor="efficiency" className="cursor-pointer flex-1">
                        Eficiencia operativa
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-secondary/50 transition-colors">
                      <RadioGroupItem value="brand" id="brand" />
                      <Label htmlFor="brand" className="cursor-pointer flex-1">
                        Posicionamiento de marca
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </motion.div>
            )}

            {/* FLUJO ESTRATÉGICO - Step 3: Recursos y Capacidades */}
            {flowType === 'estrategico' && questionnaireStep === 3 && (
              <motion.div
                key="estrategico-step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h4 className="font-heading font-semibold text-foreground mb-4">
                  Recursos y Capacidades
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="budget">Presupuesto disponible para estrategia</Label>
                    <Input
                      id="budget"
                      value={questionnaireData.marketingBudget}
                      onChange={(e) => updateQuestionnaireData({ marketingBudget: e.target.value })}
                      placeholder="Ej: $25,000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="team">Tamaño del equipo</Label>
                    <Input
                      id="team"
                      value={questionnaireData.monthlyCustomers}
                      onChange={(e) => updateQuestionnaireData({ monthlyCustomers: e.target.value })}
                      placeholder="Ej: 15"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Capacidades internas</Label>
                  <Select
                    value={questionnaireData.salesApproach}
                    onValueChange={(value) => updateQuestionnaireData({ salesApproach: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="¿Qué tan preparados están?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">Alta - Equipo experimentado y recursos completos</SelectItem>
                      <SelectItem value="medium">Media - Algunas capacidades, necesitamos apoyo</SelectItem>
                      <SelectItem value="low">Baja - Necesitamos desarrollar capacidades</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="constraints">Restricciones o desafíos conocidos</Label>
                  <Textarea
                    id="constraints"
                    value={questionnaireData.grossRevenue}
                    onChange={(e) => updateQuestionnaireData({ grossRevenue: e.target.value })}
                    placeholder="¿Qué limitaciones o desafíos enfrentas para ejecutar la estrategia?"
                    rows={3}
                  />
                </div>
              </motion.div>
            )}

            {/* FLUJO TÁCTICO - Step 1: Contexto Actual */}
            {flowType === 'tactico' && questionnaireStep === 1 && (
              <motion.div
                key="tactico-step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h4 className="font-heading font-semibold text-foreground mb-4">
                  Contexto Actual
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Ya tienes plan y estrategia. Vamos directo a las tácticas de implementación.
                </p>

                <div className="space-y-2">
                  <Label htmlFor="currentStrategy">¿Cuál es tu estrategia actual?</Label>
                  <Textarea
                    id="currentStrategy"
                    value={questionnaireData.businessGoals}
                    onChange={(e) => updateQuestionnaireData({ businessGoals: e.target.value })}
                    placeholder="Resumen breve de la estrategia que quieres implementar..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Área de enfoque táctico</Label>
                  <RadioGroup
                    value={questionnaireData.businessType}
                    onValueChange={(value) => updateQuestionnaireData({ businessType: value })}
                    className="flex flex-col gap-2"
                  >
                    <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-secondary/50 transition-colors">
                      <RadioGroupItem value="marketing" id="marketing" />
                      <Label htmlFor="marketing" className="cursor-pointer flex-1">
                        Marketing y adquisición de clientes
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-secondary/50 transition-colors">
                      <RadioGroupItem value="sales" id="sales" />
                      <Label htmlFor="sales" className="cursor-pointer flex-1">
                        Ventas y conversión
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-secondary/50 transition-colors">
                      <RadioGroupItem value="product" id="product" />
                      <Label htmlFor="product" className="cursor-pointer flex-1">
                        Producto y operaciones
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-secondary/50 transition-colors">
                      <RadioGroupItem value="all" id="all" />
                      <Label htmlFor="all" className="cursor-pointer flex-1">
                        Tácticas integrales (todas las áreas)
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timeline">Horizonte de implementación</Label>
                  <Select
                    value={questionnaireData.salesApproach}
                    onValueChange={(value) => updateQuestionnaireData({ salesApproach: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="¿En cuánto tiempo?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30days">30 días - Acciones inmediatas</SelectItem>
                      <SelectItem value="90days">90 días - Plan trimestral</SelectItem>
                      <SelectItem value="6months">6 meses - Plan semestral</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </motion.div>
            )}

            {/* FLUJO TÁCTICO - Step 2: Tácticas Prioritarias */}
            {flowType === 'tactico' && questionnaireStep === 2 && (
              <motion.div
                key="tactico-step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h4 className="font-heading font-semibold text-foreground mb-4">
                  Tácticas Prioritarias
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="budget">Presupuesto táctico disponible</Label>
                    <Input
                      id="budget"
                      value={questionnaireData.marketingBudget}
                      onChange={(e) => updateQuestionnaireData({ marketingBudget: e.target.value })}
                      placeholder="Ej: $10,000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="team">Personas disponibles para ejecutar</Label>
                    <Input
                      id="team"
                      value={questionnaireData.monthlyCustomers}
                      onChange={(e) => updateQuestionnaireData({ monthlyCustomers: e.target.value })}
                      placeholder="Ej: 3"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quickWins">¿Qué "quick wins" buscas?</Label>
                  <Textarea
                    id="quickWins"
                    value={questionnaireData.problemsSolved}
                    onChange={(e) => updateQuestionnaireData({ problemsSolved: e.target.value })}
                    placeholder="Describe resultados rápidos que esperas lograr..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="kpis">KPIs objetivo</Label>
                  <Textarea
                    id="kpis"
                    value={questionnaireData.idealCustomer}
                    onChange={(e) => updateQuestionnaireData({ idealCustomer: e.target.value })}
                    placeholder="¿Qué métricas quieres mover? (ej: +20% leads, -15% CAC, +30% conversión)"
                    rows={3}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border flex items-center justify-between bg-secondary/20">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={questionnaireStep === 1}
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Atrás
          </Button>
          <Button onClick={handleNext} className="btn-primary-gradient gap-2">
            {questionnaireStep === totalSteps ? (
              <>
                Finalizar
                <Check className="w-4 h-4" />
              </>
            ) : (
              <>
                Siguiente
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </motion.div>

      <DocumentUploadPaywall
        isOpen={showPaywall}
        onClose={() => setShowPaywall(false)}
        onSuccess={handlePaywallSuccess}
      />
    </>
  );
}
