import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterPanelComponent } from './filter-panel.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('FilterPanelComponent', () => {
  let component: FilterPanelComponent;
  let fixture: ComponentFixture<FilterPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterPanelComponent, MatFormFieldModule, MatInputModule, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit filter value on keyup', () => {
    spyOn(component.applyFilter, 'emit');
    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;

    inputElement.value = 'test filter';
    inputElement.dispatchEvent(new Event('keyup'));

    expect(component.applyFilter.emit).toHaveBeenCalledWith('test filter');
  });
});
