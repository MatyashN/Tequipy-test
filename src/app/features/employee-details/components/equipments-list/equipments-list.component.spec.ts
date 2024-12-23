import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentRef } from '@angular/core';
import { EquipmentsListComponent } from './equipments-list.component';
import { Equipment } from '../../../../core/models/equipment';

const equipments: Equipment[] = [
  {"id": "eq001", "name": "MacBook Pro"},
  {"id": "eq002", "name": "Magic Mouse"}
]

describe('EquipmentsListComponent', () => {
  let component: EquipmentsListComponent;
  let componentRef: ComponentRef<EquipmentsListComponent>;
  let fixture: ComponentFixture<EquipmentsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquipmentsListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EquipmentsListComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('equipments', equipments);

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('check li count', () => {
    const items = fixture.nativeElement.querySelectorAll('li');

    expect(items.length).toBe(equipments.length);

    items.forEach((item: any, index: number) => {
      expect(item.textContent).toContain(equipments[index].name);
    });

  })

});
