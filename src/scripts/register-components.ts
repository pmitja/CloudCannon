/**
 * Loaded only inside CloudCannon's Visual Editor.
 * Registers every section so the editor can re-render it live as content changes.
 */
import { registerAstroComponent } from '@cloudcannon/editable-regions/astro';
// Sections contain shadcn/ui (React) components, so the React renderer is needed too.
import '@cloudcannon/editable-regions/astro-react-renderer';
import { editableBlocks } from '@/components/blocks/editable';

for (const [name, component] of Object.entries(editableBlocks)) {
  registerAstroComponent(name, component);
}
