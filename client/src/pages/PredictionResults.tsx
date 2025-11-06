import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, Download, MessageSquare, Loader2 } from 'lucide-react';
import { getPredictionById } from '@/api/predictions';
import { generateReport } from '@/api/reports';
import { useToast } from '@/hooks/useToast';

interface PredictionData {
  _id: string;
  disease: string;
  confidence: number;
  description: string;
  characteristics: string[];
  similarConditions: string[];
  timestamp: string;
  imageUrl: string;
  bodyPart?: string;
  symptoms?: string;
  duration?: string;
}

export function PredictionResults() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [prediction, setPrediction] = useState<PredictionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [generatingReport, setGeneratingReport] = useState(false);

  useEffect(() => {
    const loadPrediction = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await getPredictionById(id);
        setPrediction(data as PredictionData);
      } catch (error) {
        toast({
          title: 'Error',
          description: error instanceof Error ? error.message : 'Failed to load prediction',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };

    loadPrediction();
  }, [id, toast]);

  const handleGenerateReport = async () => {
    if (!prediction) return;
    try {
      setGeneratingReport(true);
      const report = await generateReport(prediction._id);
      toast({
        title: 'Success',
        description: 'Report generated successfully'
      });
      navigate('/reports');
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to generate report',
        variant: 'destructive'
      });
    } finally {
      setGeneratingReport(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!prediction) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Prediction not found</p>
      </div>
    );
  }

  const confidenceColor = prediction.confidence >= 80 ? 'bg-red-100 text-red-800' : prediction.confidence >= 60 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800';

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Prediction Results</h1>
        <p className="text-muted-foreground">
          Analysis completed on {new Date(prediction.timestamp).toLocaleDateString()}
        </p>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          This is an AI-powered preliminary analysis. Please consult with a dermatologist for accurate diagnosis and treatment recommendations.
        </AlertDescription>
      </Alert>

      {/* Main Result */}
      <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-3xl">{prediction.disease}</CardTitle>
              <CardDescription>Predicted Condition</CardDescription>
            </div>
            <Badge className={`text-lg px-4 py-2 ${confidenceColor}`}>
              {prediction.confidence}% Confidence
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <img
                src={prediction.imageUrl}
                alt={prediction.disease}
                className="w-full rounded-lg shadow-lg"
              />
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-sm leading-relaxed">{prediction.description}</p>
              </div>
              {prediction.bodyPart && (
                <div>
                  <h3 className="font-semibold mb-2">Affected Area</h3>
                  <p className="text-sm">{prediction.bodyPart}</p>
                </div>
              )}
              {prediction.symptoms && (
                <div>
                  <h3 className="font-semibold mb-2">Reported Symptoms</h3>
                  <p className="text-sm">{prediction.symptoms}</p>
                </div>
              )}
              {prediction.duration && (
                <div>
                  <h3 className="font-semibold mb-2">Duration</h3>
                  <p className="text-sm">{prediction.duration}</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Characteristics */}
      <Card>
        <CardHeader>
          <CardTitle>Common Characteristics</CardTitle>
          <CardDescription>Typical features of this condition</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {prediction.characteristics.map((char, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="text-blue-500 font-bold mt-1">•</span>
                <span>{char}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Similar Conditions */}
      {prediction.similarConditions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Similar Conditions</CardTitle>
            <CardDescription>Other conditions that may present similarly</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {prediction.similarConditions.map((condition, idx) => (
                <Badge key={idx} variant="secondary">
                  {condition}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Next Steps */}
      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
        <CardHeader>
          <CardTitle>Recommended Next Steps</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-3">
            <span className="text-green-600 font-bold">1.</span>
            <div>
              <p className="font-semibold">Generate a Medical Report</p>
              <p className="text-sm text-muted-foreground">Create a PDF report to share with dermatologists</p>
            </div>
          </div>
          <Separator />
          <div className="flex gap-3">
            <span className="text-green-600 font-bold">2.</span>
            <div>
              <p className="font-semibold">Connect with a Dermatologist</p>
              <p className="text-sm text-muted-foreground">Get professional medical advice from board-certified specialists</p>
            </div>
          </div>
          <Separator />
          <div className="flex gap-3">
            <span className="text-green-600 font-bold">3.</span>
            <div>
              <p className="font-semibold">Schedule an Appointment</p>
              <p className="text-sm text-muted-foreground">Book a consultation for in-person examination and treatment</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          onClick={handleGenerateReport}
          disabled={generatingReport}
          className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
        >
          {generatingReport ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" />
              Generate Report
            </>
          )}
        </Button>
        <Button
          onClick={() => navigate('/doctors')}
          variant="outline"
          className="flex-1"
        >
          <MessageSquare className="mr-2 h-4 w-4" />
          Connect with Doctor
        </Button>
        <Button
          onClick={() => navigate('/prediction')}
          variant="outline"
          className="flex-1"
        >
          Try Another Image
        </Button>
      </div>
    </div>
  );
}