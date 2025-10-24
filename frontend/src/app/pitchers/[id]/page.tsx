import { EnhancedPitcherProfile } from "@/components/EnhancedPitcherProfile";

interface PitcherPageProps {
  params: {
    id: string;
  };
}

export default function PitcherPage({ params }: PitcherPageProps) {
  return <EnhancedPitcherProfile playerId={params.id} />;
}
