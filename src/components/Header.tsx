import { Menu } from 'lucide-react';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

type Link = { label: string; url: string };
type NavItem = Link & { children?: Link[] };

type Props = {
  navigation: NavItem[];
  button: Link;
  logo: { wordmark: string; tagline: string };
};

export default function Header({ navigation, button, logo }: Props) {
  return (
    <header className="sticky top-0 z-50 border-b-[3px] border-double border-foreground bg-background">
      <div className="container-ltse flex h-[68px] items-center justify-between gap-6">
        <a href="/" aria-label="LTSE home">
          <Logo {...logo} />
        </a>

        {/* Desktop navigation: shadcn NavigationMenu */}
        <NavigationMenu viewport={false} className="hidden xl:flex">
          <NavigationMenuList className="gap-1">
            {navigation.map((item) =>
              item.children?.length ? (
                <NavigationMenuItem key={item.label}>
                  <NavigationMenuTrigger className="bg-transparent font-medium">{item.label}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[260px] gap-1 p-1">
                      {item.children.map((child) => (
                        <li key={child.label}>
                          <NavigationMenuLink href={child.url}>{child.label}</NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ) : (
                <NavigationMenuItem key={item.label}>
                  <NavigationMenuLink href={item.url} className="px-4 py-2 font-medium">
                    {item.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ),
            )}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="lg" className="hidden sm:inline-flex">
            <a href={button.url}>{button.label}</a>
          </Button>

          {/* Mobile navigation: shadcn Sheet + Accordion */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="xl:hidden" aria-label="Open menu">
                <Menu className="size-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-sm overflow-y-auto">
              <SheetHeader>
                <SheetTitle className="font-sans font-normal">
                  <Logo {...logo} />
                </SheetTitle>
              </SheetHeader>
              <Accordion type="single" collapsible className="px-4 [&_h3]:font-sans">
                {navigation.map((item) =>
                  item.children?.length ? (
                    <AccordionItem key={item.label} value={item.label}>
                      <AccordionTrigger className="font-sans text-base">{item.label}</AccordionTrigger>
                      <AccordionContent>
                        <ul className="grid gap-3 pl-2">
                          {item.children.map((child) => (
                            <li key={child.label}>
                              <a href={child.url} className="text-sm hover:underline">
                                {child.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ) : (
                    <a key={item.label} href={item.url} className="block border-b py-4 text-base font-medium">
                      {item.label}
                    </a>
                  ),
                )}
              </Accordion>
              <div className="px-4 pb-6">
                <Button asChild size="lg" className="w-full">
                  <a href={button.url}>{button.label}</a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
