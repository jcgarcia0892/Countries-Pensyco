import { TestBed } from '@angular/core/testing';
import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StorageService]
    });
    service = TestBed.inject(StorageService);
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return defaultValue if item is not found', () => {
    const result = service.getItem<string[]>('non_existent_key', ['default']);
    expect(result).toEqual(['default']);
  });

  it('should save and retrieve typed data', () => {
    const data = [{ id: 1, name: 'Test' }];
    const success = service.setItem('test_key', data);
    expect(success).toBeTrue();

    const retrieved = service.getItem<{ id: number; name: string }[]>('test_key', []);
    expect(retrieved).toEqual(data);
  });

  it('should remove items correctly', () => {
    service.setItem('test_key', 'value');
    service.removeItem('test_key');
    const result = service.getItem<string>('test_key', 'fallback');
    expect(result).toBe('fallback');
  });
});
