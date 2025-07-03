import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// This component assumes you have shadcn/ui's Card, Badge, and Table installed.
// npx shadcn-ui@latest add card badge table

export function AmharicNlpInsightsAm() {
  return (
    <div className="container mx-auto max-w-4xl p-4 md:p-8 font-['Noto_Sans_Ethiopian',_sans-serif]">
      {/* Header */}
      <header className="text-center mb-10 md:mb-12">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          የአማርኛ NLP የመረጃ ስብስብ ቁልፍ ግንዛቤዎች
        </h1>
        <p className="mt-3 text-xl text-muted-foreground">
          ለመረጃዎ ግንዛቤን ለማግኘት እና ለሞዴል ስልጠና ለመጠቀም የሚረዳ መመሪያ።
        </p>
      </header>

      <main className="space-y-8">
        {/* Section 1: Dataset Contributions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">1. የመረጃ ስብስብ አስተዋጽኦዎች (ምንድን ነው?)</CardTitle>
            <CardDescription>
              የመረጃዎን ጥራት፣ ምንጭ እና ሊኖሩ የሚችሉ ዝንባሌዎችን ይረዱ።
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">1</span>
                <div>
                  <h4 className="font-semibold">ምንጭ እና አመጣጥ</h4>
                  <p className="text-muted-foreground">መረጃው ከየት ተገኘ?</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Badge variant="secondary">የዜና ማሰራጫዎች</Badge>
                    <Badge variant="secondary">ማህበራዊ ሚዲያ</Badge>
                    <Badge variant="secondary">ሥነ ጽሑፍ</Badge>
                    <Badge variant="secondary">ሃይማኖታዊ ጽሑፎች</Badge>
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">2</span>
                <div>
                  <h4 className="font-semibold">ይዘት እና የትኩረት መስክ ትንተና</h4>
                  <p className="text-muted-foreground">
                    ምን አይነት ርዕሰ ጉዳዮችን ይሸፍናል? ይህ ሊኖር የሚችል <strong className="font-medium text-foreground">የትኩረት መስክ ዝንባሌን</strong> ያሳያል።
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">3</span>
                <div>
                  <h4 className="font-semibold">የመረጃ እና የማብራሪያ ጥራት</h4>
                  <p className="text-muted-foreground">
                    የፊደል ግድፈቶችን እና ስህተቶችን ያረጋግጡ። ምድብ ላለው መረጃ <strong className="font-medium text-foreground">በአማራሪዎች መካከል ያለውን ስምምነት (IAA)</strong> ይለኩ።
                  </p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Section 2: Explanatory Statistics */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">2. ገላጭ ስታቲስቲክስ (ምን ያህል ነው?)</CardTitle>
            <CardDescription>
              የመረጃ ስብስብዎን ባህሪያት ለመግለጽ የቁጥር መለኪያዎችን ይጠቀሙ።
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
            <div>
              <h4 className="font-semibold">የኮርፐስ (የጽሑፍ ክምችት) ደረጃ ስታቲስቲክስ</h4>
              <p className="text-sm text-muted-foreground">የጠቅላላ ቶክኖች ብዛት፣ የቃላት ብዛት፣ እና የቃላት ብዝሃነት ጥምርታ (TTR)።</p>
            </div>
            <div>
              <h4 className="font-semibold">የአረፍተ ነገር/የሰነድ ደረጃ</h4>
              <p className="text-sm text-muted-foreground">የርዝመት ስርጭት (ዝቅተኛ፣ ከፍተኛ፣ አማካይ)። ለ<code className="font-mono text-sm">max_sequence_length</code> በጣም አስፈላጊ ነው።</p>
            </div>
            <div>
              <h4 className="font-semibold">ከምድብ-ተኮር ስታቲስቲክስ</h4>
              <p className="text-sm text-muted-foreground">የምደባ ስራዎች ላይ <strong className="font-medium text-foreground">የክፍሎች አለመመጣጠንን</strong> ለመለየት ይረዳል።</p>
            </div>
            <div>
              <h4 className="font-semibold">የኤን-ግራም (N-gram) ትንተና</h4>
              <p className="text-sm text-muted-foreground">ተደጋጋሚ ሀረጎችን ለማግኘት የጋራ ዩኒግራም፣ ባይግራም እና ትራይግራም ድግግሞሽ።</p>
            </div>
          </CardContent>
        </Card>
        
        {/* Section 3: How Input Supports Training */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">3. የመረጃዎ አስተዋጽኦ ለሞዴል ስልጠና (ታዲያ ምን?)</CardTitle>
            <CardDescription>
              የመረጃ ግንዛቤዎን በቀጥታ ከሞዴል ማሰልጠኛ ስልቶች ጋር ያገናኙ።
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ከትንተናው የተገኘ ግንዛቤ</TableHead>
                  <TableHead>በሞዴል ስልጠና ላይ ያለው ተጽዕኖ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">የተለያዩ የመረጃ ምንጮች</TableCell>
                  <TableCell>የሞዴሉን <strong className="font-semibold">ሁሉን አቀፍ ብቃት</strong> ያሻሽላል።</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">የአረፍተ ነገር ርዝመት ስርጭት</TableCell>
                  <TableCell>ውጤታማ የሃይፐር-ፓራሜትር ማስተካከያ (ለምሳሌ <code className="font-mono text-sm">max_length</code>) ለማድረግ ያግዛል።</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">የክፍሎች አለመመጣጠን መለየት</TableCell>
                  <TableCell>እንደ <strong className="font-semibold">ክብደት የተሰጣቸው የኪሳራ ፈንክሽኖች</strong> ያሉ ቴክኒኮችን ለመጠቀም ያነሳሳል።</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">ንፁህ እና ጥራት ያለው መረጃ</TableCell>
                  <TableCell>ከስህተት ይልቅ ትክክለኛ የቋንቋ ዘይቤዎችን የሚማር <strong className="font-semibold">ጠንካራ ሞዴል</strong> ይፈጥራል።</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>

      <footer className="text-center mt-12 pt-8 border-t">
          <p className="text-sm text-muted-foreground">
              ይህ ገጽ በReact, Tailwind CSS, እና shadcn/ui የተሰራ ነው።
          </p>
      </footer>
    </div>
  );
}