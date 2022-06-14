import { TestBed } from '@angular/core/testing';

import { SensorRecordsService } from './sensor-records.service';

describe('SensorRecordsService', () => {
  let service: SensorRecordsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SensorRecordsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
