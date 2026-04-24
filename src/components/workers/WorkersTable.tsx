

import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User, Phone, SquareArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";


interface WorkerRow {
  id: string;
  name: string;
  mobile?: string | null;
  daysWorked: number;
  totalAmount: number;
  unpaidAmount: number;
}

interface WorkersTableProps {
  workers: WorkerRow[];
}

export function WorkersTable({ workers }: WorkersTableProps) {

  return (
    <div className="rounded-md border bg-card">
      <Table>
        <TableHeader className="border-b bg-muted/50">
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Mobile</TableHead>
            <TableHead className="text-center">Days Worked</TableHead>
            <TableHead className="text-center">Total Amount</TableHead>
            <TableHead className="text-center">Paid Amount</TableHead>
            <TableHead className="text-center">Unpaid Amount</TableHead>
            {/* <TableHead className="text-right">Actions</TableHead> */}
          </TableRow>
        </TableHeader>

        {workers.length === 0 ? (
          <TableBody>
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                <p className="p-1 font-mono font-semibold text-muted-foreground">No workers found</p>
              </TableCell>
            </TableRow>
          </TableBody>
        ) : (
          <TableBody>
            {workers!.map((worker) => (
              <TableRow key={worker.id}>
                <TableCell className="font-medium ">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <User className="h-4 w-4" />
                    </div>
                    <Link href={`/workers/${worker.id}`} className="group">
                      <span className="flex items-center gap-2 cursor-pointer hover:text-blue-600">
                        {worker.name}
                        <SquareArrowUpRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                      </span>
                    </Link>

                  </div>
                </TableCell>

                <TableCell>
                  {worker.mobile ? (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="h-3 w-3" />
                      {worker.mobile}
                    </div>
                  ) : (
                    "-"
                  )}
                </TableCell>

                <TableCell className="font-semibold text-center">{worker.daysWorked}</TableCell>
                <TableCell className="font-semibold text-center">{worker.totalAmount}</TableCell>
                <TableCell className="font-semibold text-center">{worker.totalAmount - worker.unpaidAmount}</TableCell>
                <TableCell className="text-center">
                  {worker.totalAmount && worker.unpaidAmount === 0 ? (
                    <Badge variant="secondary" className="bg-green-500">All Paid</Badge>
                  ) : (
                    <span className="font-semibold text-orange-500">{worker.unpaidAmount}</span>
                  )}
                </TableCell>

                {/* <TableCell className="text-right">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/workers/${worker.id}`}>
                      View Details <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </div>
  );
}
