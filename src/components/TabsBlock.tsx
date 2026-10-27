import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LinkButton from '@/components/LinkButton';

type Tab = {
  label: string;
  title: string;
  text: string;
  button?: { label: string; url: string };
};

/** Interactive tabs (shadcn Tabs), hydrated as a small React island. */
export default function TabsBlock({ tabs }: { tabs: Tab[] }) {
  if (!tabs.length) return null;
  return (
    <Tabs defaultValue={tabs[0].label} className="mt-6 gap-8">
      <TabsList variant="line" className="h-10 w-full max-w-md border-b-[3px] border-foreground p-0">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.label} value={tab.label} className="text-[13px] after:!h-[3px]">
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.label} value={tab.label}>
          <p className="text-[14px] font-semibold">{tab.title}</p>
          <p className="mt-3 max-w-sm text-[13px] leading-relaxed">{tab.text}</p>
          {tab.button?.label && (
            <LinkButton className="mt-10" href={tab.button.url} label={tab.button.label} />
          )}
        </TabsContent>
      ))}
    </Tabs>
  );
}
