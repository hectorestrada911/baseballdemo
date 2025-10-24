import { EnhancedHitterProfile } from "@/components/EnhancedHitterProfile";

interface HitterPageProps {
  params: {
    id: string;
  };
}

export default function HitterPage({ params }: HitterPageProps) {
  return <EnhancedHitterProfile playerId={params.id} />;
}
