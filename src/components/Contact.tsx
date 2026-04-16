import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT as string | undefined;
const FALLBACK_EMAIL = 'trifangeorge@yahoo.com';

function Contact() {
  const { t } = useTranslation('contact');
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const validateForm = (data: ContactFormData): FormErrors => {
    const validationErrors: FormErrors = {};
    if (!data.name.trim()) {
      validationErrors.name = t('validation.nameRequired');
    }
    if (!data.email.trim()) {
      validationErrors.email = t('validation.emailRequired');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      validationErrors.email = t('validation.emailInvalid');
    }
    if (!data.message.trim()) {
      validationErrors.message = t('validation.messageRequired');
    }
    return validationErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus(null);

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      if (!FORM_ENDPOINT) {
        throw new Error('Form service not configured');
      }
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Submission failed');
      }
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      component="section"
      id="contact"
      sx={{
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: 'background.default',
      }}
    >
      <Container maxWidth="lg" sx={{ height: '100%', display: 'flex', alignItems: 'stretch' }}>
        <Box sx={{ flex: 1, backgroundColor: 'primary.main', px: { xs: 3, md: 6 }, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', pb: 12 }}>
          <Box sx={{ width: '100%', maxWidth: 600 }}>
        <Typography
          variant="h2"
          component="h1"
          sx={{
            textAlign: 'center',
            mb: 6,
            color: '#ffffff',
            fontSize: { xs: '1.75rem', md: '2.25rem' },
          }}
        >
          {t('heading')}
        </Typography>

        {submitStatus === 'success' && (
          <Alert severity="success" sx={{ mb: 3 }} data-testid="contact-success">
            {t('status.success')}
          </Alert>
        )}

        {submitStatus === 'error' && (
          <Alert severity="error" sx={{ mb: 3 }} data-testid="contact-error">
            {t('status.error')}{' '}
            <a href={`mailto:${FALLBACK_EMAIL}`}>{FALLBACK_EMAIL}</a>.
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate aria-label={t('form.ariaLabel')} data-testid="contact-form">
          <TextField
            fullWidth
            label={t('form.name')}
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            required
            slotProps={{ htmlInput: { 'data-testid': 'contact-name' } }}
            sx={{ mb: 3, '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)', '&.Mui-focused': { color: '#fff' } }, '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: 'rgba(255,255,255,0.4)' }, '&:hover fieldset': { borderColor: '#fff' }, '&.Mui-focused fieldset': { borderColor: '#fff' }, '& input:-webkit-autofill': { WebkitBoxShadow: '0 0 0 100px #5B4A3F inset', WebkitTextFillColor: '#fff' } } }}
          />
          <TextField
            fullWidth
            label={t('form.email')}
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            required
            slotProps={{ htmlInput: { 'data-testid': 'contact-email' } }}
            sx={{ mb: 3, '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)', '&.Mui-focused': { color: '#fff' } }, '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: 'rgba(255,255,255,0.4)' }, '&:hover fieldset': { borderColor: '#fff' }, '&.Mui-focused fieldset': { borderColor: '#fff' }, '& input:-webkit-autofill': { WebkitBoxShadow: '0 0 0 100px #5B4A3F inset', WebkitTextFillColor: '#fff' } } }}
          />
          <TextField
            fullWidth
            label={t('form.message')}
            name="message"
            value={formData.message}
            onChange={handleChange}
            error={!!errors.message}
            helperText={errors.message}
            required
            multiline
            rows={5}
            slotProps={{ htmlInput: { 'data-testid': 'contact-message' } }}
            sx={{ mb: 3, '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)', '&.Mui-focused': { color: '#fff' } }, '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: 'rgba(255,255,255,0.4)' }, '&:hover fieldset': { borderColor: '#fff' }, '&.Mui-focused fieldset': { borderColor: '#fff' }, '& textarea:-webkit-autofill': { WebkitBoxShadow: '0 0 0 100px #5B4A3F inset', WebkitTextFillColor: '#fff' } } }}
          />
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            size="large"
            fullWidth
            disabled={isSubmitting}
            data-testid="contact-submit"
            sx={{
              py: 1.5,
              fontSize: '1.1rem',
              textTransform: 'none',
            }}
          >
            {isSubmitting ? <CircularProgress size={24} color="inherit" /> : t('form.submit')}
          </Button>
          </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Contact;
