import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileCheck, AlertCircle, CheckCircle, Clock } from "lucide-react";

interface Document {
  name: string;
  status: "approved" | "pending" | "rejected";
  uploadDate: string;
  remarks?: string;
}

const SellerKYC = () => {
  const documents: Document[] = [
    {
      name: "GST Certificate",
      status: "approved",
      uploadDate: "2024-01-05",
    },
    {
      name: "MSME Certificate",
      status: "approved",
      uploadDate: "2024-01-05",
    },
    {
      name: "FSSAI Certificate",
      status: "pending",
      uploadDate: "2024-01-10",
      remarks: "Document under review",
    },
    {
      name: "Cancelled Cheque",
      status: "approved",
      uploadDate: "2024-01-05",
    },
    {
      name: "Address Proof",
      status: "rejected",
      uploadDate: "2024-01-06",
      remarks: "Document not clear. Please re-upload",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case "rejected":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-500">Approved</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500">Under Review</Badge>;
      case "rejected":
        return <Badge className="bg-red-500">Rejected</Badge>;
      default:
        return null;
    }
  };

  const approvedCount = documents.filter(d => d.status === "approved").length;
  const pendingCount = documents.filter(d => d.status === "pending").length;
  const rejectedCount = documents.filter(d => d.status === "rejected").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">KYC Verification</h1>
        <p className="text-muted-foreground mt-2">Manage your verification documents</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Approved
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{approvedCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Review
            </CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">{pendingCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Rejected
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">{rejectedCount}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Uploaded Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {documents.map((doc, index) => (
              <div key={index} className="flex items-start justify-between py-3 border-b last:border-0">
                <div className="flex items-start gap-3">
                  {getStatusIcon(doc.status)}
                  <div>
                    <div className="font-medium">{doc.name}</div>
                    <div className="text-sm text-muted-foreground">
                      Uploaded on: {doc.uploadDate}
                    </div>
                    {doc.remarks && (
                      <div className="text-sm mt-1 text-muted-foreground italic">
                        {doc.remarks}
                      </div>
                    )}
                  </div>
                </div>
                {getStatusBadge(doc.status)}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Verification Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <FileCheck className="h-5 w-5 text-primary" />
              <div>
                <div className="font-medium">Overall Status</div>
                <div className="text-sm text-muted-foreground">
                  {rejectedCount > 0 ? (
                    <span className="text-red-500">Action Required - Please re-upload rejected documents</span>
                  ) : pendingCount > 0 ? (
                    <span className="text-yellow-500">Under Review - We'll notify you once verified</span>
                  ) : (
                    <span className="text-green-500">Fully Verified - You can start selling!</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SellerKYC;
