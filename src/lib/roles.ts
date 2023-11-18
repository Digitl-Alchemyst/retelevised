const operatorActions: Set<string> = new Set([
  'set-listening-view',
  'set-view-background-listening',
  'set-view-blurred',
  'update-custom-stream',
  'delete-custom-stream',
  'rotate-stream',
  'reload-view',
  'set-stream-censored',
  'set-stream-running',
  'mutate-state-doc',
]);

const productionManagerActions: Set<string> = new Set([
  'set-listening-view',
  'set-view-background-listening',
  'set-view-blurred',
  'update-custom-stream',
  'delete-custom-stream',
  'rotate-stream',
  'reload-view',
  'set-stream-censored',
  'set-stream-running',
  'mutate-state-doc',
]);

const productionAssistantActions: Set<string> = new Set([
  'set-listening-view',
  'set-view-background-listening',
  'set-view-blurred',
  'update-custom-stream',
  'delete-custom-stream',
  'rotate-stream',
  'reload-view',
  'set-stream-censored',
  'set-stream-running',
  'mutate-state-doc',
]);

const feedMonitorActions: Set<string> = new Set([
  'set-view-blurred',
  'set-stream-censored',
]);

//TODO: Define Actions

export const validRoles: Set<string> = new Set([
  'admin',
  'productionManager',
  'productionAssistant',
  'operator',
  'feedMonitor',
]);

export function roleCan(role: string, action: string): boolean {
  if (role === 'admin') {
    return true;
  }

  if (role === 'operator' && productionManagerActions.has(action)) {
    return true;
  }

  if (role === 'operator' && productionAssistantActions.has(action)) {
    return true;
  }

  if (role === 'operator' && operatorActions.has(action)) {
    return true;
  }

  if (role === 'monitor' && feedMonitorActions.has(action)) {
    return true;
  }

  return false;
}
