import { TestBed } from '@angular/core/testing';


import { FechasExperienciaService } from '../services/fechas-experiencia.service';


describe('FechasExperienciaService', () => {
    let service: FechasExperienciaService;


    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(FechasExperienciaService);
    });


    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
