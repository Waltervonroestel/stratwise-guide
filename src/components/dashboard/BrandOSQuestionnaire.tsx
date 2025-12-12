import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Check, Building, Users, DollarSign, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAppStore } from '@/store/appStore';

const steps = [
  { id: 1, title: 'Información General', icon: Building },
  { id: 2, title: 'Modelo de Negocio', icon: Users },
  { id: 3, title: 'Finanzas y Metas', icon: DollarSign },
  { id: 4, title: 'Audiencia Objetivo', icon: Target },
];

export function BrandOSQuestionnaire() {
  const {
    questionnaireStep,
    setQuestionnaireStep,
    questionnaireData,
    updateQuestionnaireData,
    completeQuestionnaire,
    questionnaireCompleted,
  } = useAppStore();

  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleNext = () => {
    if (questionnaireStep < 4) {
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-xl shadow-lg max-w-2xl overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-purple-600 p-4 text-primary-foreground">
        <h3 className="font-heading font-semibold text-lg">Cuestionario BrandOS</h3>
        <p className="text-sm opacity-90">Paso {questionnaireStep} de 4</p>
      </div>

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
          {questionnaireStep === 1 && (
            <motion.div
              key="step1"
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

          {questionnaireStep === 2 && (
            <motion.div
              key="step2"
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

          {questionnaireStep === 3 && (
            <motion.div
              key="step3"
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

          {questionnaireStep === 4 && (
            <motion.div
              key="step4"
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
          {questionnaireStep === 4 ? (
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
  );
}
