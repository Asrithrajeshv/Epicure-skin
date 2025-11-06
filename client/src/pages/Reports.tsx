import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Download, Trash2, Share2, Loader2 } from 'lucide-react';
import { getReports, deleteReport } from '@/api/reports';
import { useToast } from '@/hooks/useToast';

interface Report {
  _id: string;
  predictionId: string;
  disease: string;
  confidence: number;
  timestamp: string;
  pdfUrl: string;
}

export function Reports() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    const loadReports = async () => {
      try {
        setLoading(true);
        const data = await getReports();
        setReports((data as { reports: Report[] }).reports);
      } catch (error) {
        toast({
          title: 'Error',
          description: error instanceof Error ? error.message : 'Failed to load reports',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };

    loadReports();
  }, [toast]);

  const handleDelete = async (reportId: string) => {
    try {
      setDeleting(reportId);
      await deleteReport(reportId);
      setReports(reports.filter(r => r._id !== reportId));
      toast({
        title: 'Success',
        description: 'Report deleted successfully'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to delete report',
        variant: 'destructive'
      });
    } finally {
      setDeleting(null);
    }
  };

  const handleDownload = (pdfUrl: string) => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `report_${Date.now()}.pdf`;
    link.click();
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">My Reports</h1>
        <p className="text-muted-foreground">
          View and manage your generated medical reports
        </p>
      </div>

      {reports.length === 0 ? (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            No reports yet. Generate your first report from a prediction result.
          </AlertDescription>
        </Alert>
      ) : (
        <div className="space-y-4">
          {reports.map((report) => (
            <Card key={report._id} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{report.disease}</h3>
                      <Badge variant="secondary">
                        {report.confidence}% confidence
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Generated on {new Date(report.timestamp).toLocaleDateString()} at {new Date(report.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleDownload(report.pdfUrl)}
                      variant="outline"
                      size="sm"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button
                      onClick={() => navigate('/doctors')}
                      variant="outline"
                      size="sm"
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                    <Button
                      onClick={() => handleDelete(report._id)}
                      disabled={deleting === report._id}
                      variant="destructive"
                      size="sm"
                    >
                      {deleting === report._id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}