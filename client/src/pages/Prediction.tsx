import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, AlertCircle, Loader2 } from 'lucide-react';
import { submitPrediction } from '@/api/predictions';
import { useToast } from '@/hooks/useToast';

const predictionSchema = z.object({
  bodyPart: z.string().optional(),
  symptoms: z.string().optional(),
  duration: z.string().optional()
});

type PredictionFormData = z.infer<typeof predictionSchema>;

export function Prediction() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<PredictionFormData>({
    resolver: zodResolver(predictionSchema)
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: 'File too large',
          description: 'Please upload an image smaller than 5MB',
          variant: 'destructive'
        });
        return;
      }

      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        toast({
          title: 'Invalid format',
          description: 'Please upload a JPG or PNG image',
          variant: 'destructive'
        });
        return;
      }

      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.add('border-blue-500', 'bg-blue-50', 'dark:bg-blue-950');
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove('border-blue-500', 'bg-blue-50', 'dark:bg-blue-950');
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.remove('border-blue-500', 'bg-blue-50', 'dark:bg-blue-950');
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const input = document.createElement('input');
      input.type = 'file';
      Object.defineProperty(input, 'files', {
        value: e.dataTransfer.files
      });
      handleImageChange({ target: input } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  const onSubmit = async (data: PredictionFormData) => {
    if (!image || !preview) {
      toast({
        title: 'Image required',
        description: 'Please upload an image before submitting',
        variant: 'destructive'
      });
      return;
    }

    try {
      setLoading(true);
      const result = await submitPrediction({
        imageUrl: preview,
        bodyPart: data.bodyPart,
        symptoms: data.symptoms,
        duration: data.duration
      });

      toast({
        title: 'Success',
        description: 'Prediction completed successfully'
      });

      navigate(`/prediction-results/${(result as { _id: string })._id}`);
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to submit prediction',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-20">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Skin Disease Prediction</h1>
        <p className="text-muted-foreground">
          Upload a clear image of the affected skin area for AI-powered analysis
        </p>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          This tool provides preliminary analysis only. Always consult with a dermatologist for accurate diagnosis and treatment.
        </AlertDescription>
      </Alert>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Image Upload */}
          <Card>
            <CardHeader>
              <CardTitle>Upload Image</CardTitle>
              <CardDescription>JPG or PNG, max 5MB</CardDescription>
            </CardHeader>
            <CardContent>
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer transition-colors hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950"
              >
                <input
                  type="file"
                  accept="image/jpeg,image/png"
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-input"
                />
                <label htmlFor="image-input" className="cursor-pointer">
                  {preview ? (
                    <div className="space-y-4">
                      <img
                        src={preview}
                        alt="Preview"
                        className="max-h-64 mx-auto rounded-lg"
                      />
                      <p className="text-sm text-muted-foreground">
                        Click to change image or drag and drop
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Upload className="h-12 w-12 mx-auto text-muted-foreground" />
                      <div>
                        <p className="font-semibold">Drag and drop your image here</p>
                        <p className="text-sm text-muted-foreground">or click to browse</p>
                      </div>
                    </div>
                  )}
                </label>
              </div>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
              <CardDescription>Help us provide better analysis</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="bodyPart"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Affected Body Part</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select body part" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="face">Face</SelectItem>
                        <SelectItem value="neck">Neck</SelectItem>
                        <SelectItem value="chest">Chest</SelectItem>
                        <SelectItem value="back">Back</SelectItem>
                        <SelectItem value="arms">Arms</SelectItem>
                        <SelectItem value="legs">Legs</SelectItem>
                        <SelectItem value="hands">Hands</SelectItem>
                        <SelectItem value="feet">Feet</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>Where is the affected area located?</FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="symptoms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Symptoms</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe any symptoms (itching, pain, bleeding, etc.)"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Optional: Describe any symptoms you're experiencing</FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., 2 weeks, 1 month"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>How long have you had this condition?</FormDescription>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/')}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading || !preview}
              className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                'Submit for Analysis'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}