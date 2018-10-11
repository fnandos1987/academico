import { ProtectedRoutingModule } from './protected-routing.module';

describe('ProtectedRoutingModule', () => {
  let protectedRoutingModule: ProtectedRoutingModule;

  beforeEach(() => {
    protectedRoutingModule = new ProtectedRoutingModule();
  });

  it('should create an instance', () => {
    expect(protectedRoutingModule).toBeTruthy();
  });
});
