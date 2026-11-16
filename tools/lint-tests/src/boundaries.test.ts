import { execFileSync } from 'node:child_process';
import { join } from 'node:path';

/**
 * Proves the lint rules in eslint.config.mjs actually fire. Each case lints
 * a virtual file placed inside a real project, through the ESLint CLI, so it
 * uses exactly the configuration developers and CI use.
 */
const root = join(__dirname, '..', '..', '..');
const eslintBin = join(root, 'node_modules', '.bin', 'eslint');

interface LintMessage {
  ruleId: string | null;
  message: string;
}

function lint(filePath: string, code: string): LintMessage[] {
  let stdout: string;
  try {
    stdout = execFileSync(
      eslintBin,
      ['--stdin', '--stdin-filename', filePath, '--format', 'json'],
      { cwd: root, input: code, encoding: 'utf8' },
    );
  } catch (error) {
    // ESLint exits with code 1 when it reports errors; the JSON is still on stdout.
    stdout = (error as { stdout: string }).stdout;
  }
  const [result] = JSON.parse(stdout) as Array<{ messages: LintMessage[] }>;
  return result?.messages ?? [];
}

const boundaryErrors = (messages: LintMessage[]) =>
  messages.filter((m) => m.ruleId === '@nx/enforce-module-boundaries');

describe('module boundaries', () => {
  it('blocks an atom importing data access', () => {
    const messages = lint(
      'libs/ui/atoms/src/lib/boundary-probe/Probe.tsx',
      "import { x } from '@homebase/data-access';\nexport const y = x;\n",
    );
    expect(boundaryErrors(messages)).toHaveLength(1);
    expect(boundaryErrors(messages)[0]?.message).toMatch(/type:ui-atom/);
  });

  it('blocks a molecule importing a feature', () => {
    const messages = lint(
      'libs/ui/molecules/src/lib/boundary-probe/Probe.tsx',
      "import { x } from '@homebase/feature-rooms';\nexport const y = x;\n",
    );
    expect(boundaryErrors(messages)).toHaveLength(1);
  });

  it('blocks a feature importing Gluestack directly', () => {
    const messages = lint(
      'libs/features/rooms/src/lib/boundary-probe/probe.ts',
      "import { x } from '@gluestack-ui/core';\nexport const y = x;\n",
    );
    expect(boundaryErrors(messages)).toHaveLength(1);
    expect(boundaryErrors(messages)[0]?.message).toMatch(/@gluestack-ui\/core/);
  });

  it('blocks a feature importing Supabase directly', () => {
    const messages = lint(
      'libs/features/rooms/src/lib/boundary-probe/probe.ts',
      "import { createClient } from '@supabase/supabase-js';\nexport const c = createClient;\n",
    );
    expect(boundaryErrors(messages)).toHaveLength(1);
  });

  it('allows an atom importing design tokens', () => {
    const messages = lint(
      'libs/ui/atoms/src/lib/boundary-probe/Probe.tsx',
      "import { tokens } from '@homebase/design-tokens';\nexport const c = tokens.color.primary;\n",
    );
    expect(boundaryErrors(messages)).toHaveLength(0);
  });
});

describe('design token rules', () => {
  const file = 'libs/ui/molecules/src/lib/token-probe/Probe.tsx';
  const restricted = (messages: LintMessage[]) =>
    messages.filter((m) => m.ruleId === 'no-restricted-syntax');

  it('blocks raw hex colours', () => {
    expect(
      restricted(lint(file, "export const c = '#2F6B57';\n")),
    ).toHaveLength(1);
  });

  it('blocks arbitrary Tailwind values', () => {
    expect(
      restricted(lint(file, "export const c = 'p-[13px] bg-bg';\n")),
    ).toHaveLength(1);
  });

  it('blocks raw numeric style values', () => {
    expect(
      restricted(lint(file, 'export const s = { padding: 12 };\n')),
    ).toHaveLength(1);
  });

  it('allows token classes', () => {
    expect(
      restricted(
        lint(file, "export const c = 'p-4 bg-primary rounded-card';\n"),
      ),
    ).toHaveLength(0);
  });
});
