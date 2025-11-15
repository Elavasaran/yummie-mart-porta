import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Upload } from "lucide-react";
import { toast } from "sonner";

interface InvoiceUploadProps {
  orderId: string;
  isOpen: boolean;
  onClose: () => void;
  onUpload: (data: { invoiceNumber: string; amount: number; file: File }) => void;
}

const InvoiceUpload = ({ orderId, isOpen, onClose, onUpload }: InvoiceUploadProps) => {
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = () => {
    if (!invoiceNumber || !amount || !file) {
      toast.error("Please fill all fields and upload invoice");
      return;
    }

    onUpload({
      invoiceNumber,
      amount: parseFloat(amount),
      file,
    });

    toast.success("Invoice uploaded successfully!");
    setInvoiceNumber("");
    setAmount("");
    setFile(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Invoice for {orderId}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="invoice-number">Invoice Number *</Label>
            <Input
              id="invoice-number"
              value={invoiceNumber}
              onChange={(e) => setInvoiceNumber(e.target.value)}
              placeholder="Enter invoice number"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (₹) *</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter invoice amount"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="invoice-file">Upload Invoice (PDF/JPG) *</Label>
            <Input
              id="invoice-file"
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              accept=".pdf,.jpg,.jpeg,.png"
            />
            {file && (
              <p className="text-sm text-muted-foreground">
                Selected: {file.name}
              </p>
            )}
          </div>

          <div className="bg-muted p-4 rounded-lg text-sm">
            <p className="font-medium mb-2">Important:</p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Invoice must be clear and readable</li>
              <li>Amount should match the order total</li>
              <li>Payout will be released after invoice verification</li>
            </ul>
          </div>

          <Button onClick={handleUpload} className="w-full">
            <Upload className="h-4 w-4 mr-2" />
            Upload Invoice
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InvoiceUpload;
