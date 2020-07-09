import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ImageFile} from '../../../models/interfaces';
import {MatDialog} from '@angular/material';
import {SchedulesModalComponent} from '../../../ui/modals/schedules-modal/schedules-modal.component';
import {AddressDialogComponent} from '../../../ui/modals/address-dialog/address-dialog.component';
import {AppService} from '../../../services/app.service';
import {AuthorizationService} from '../../../services/authorization.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss']
})
export class Step1Component implements OnInit {

  form: FormGroup;
  requiredPhotos = {
    photo1: null,
    photo2: null,
    photo3: null
  };
  photos: ImageFile[] = [];

  brands: {
    title: string,
    logo: string
  }[] = [
    // tslint:disable-next-line:max-line-length
    {title: 'Kia', logo: '001-kia.png'}, {title: 'Smart', logo: '002-smart.png'}, {title: 'Fiat', logo: '003-fiat.png'}, {title: 'Ford', logo: '004-ford.png'}, {title: 'Mini', logo: '005-mini.png'}, {title: 'Porsche', logo: '006-porsche.png'}, {title: 'Jeep', logo: '007-jeep.png'}, {title: 'Holden', logo: '008-holden.png'}, {title: 'Ferrari', logo: '009-ferrari.png'}, {title: 'Tesla', logo: '010-tesla.png'}, {title: 'Sym-Motor', logo: '011-sym-motor.png'}, {title: 'Tvs', logo: '012-tvs.png'}, {title: 'Bimota', logo: '013-bimota.png'}, {title: 'Hyosung', logo: '021-hyosung.png'}, {title: 'Derbi', logo: '022-derbi.png'}, {title: 'Harley-Davidson', logo: '023-harley-davidson.png'}, {title: 'Porto', logo: '031-porto.png'}, {title: 'New-York', logo: '032-new-york.png'}, {title: 'Underground', logo: '033-underground.png'}, {title: 'Beat', logo: '014-beat.png'}, {title: 'Vespa', logo: '015-vespa.png'}, {title: 'Piaggio', logo: '024-piaggio.png'}, {title: 'Husqvarna', logo: '025-husqvarna.png'}, {title: 'Tokyo', logo: '034-tokyo.png'}, {title: 'Sao-Paulo', logo: '035-sao-paulo.png'}, {title: 'Delta-Airlines', logo: '041-delta-airlines.png'}, {title: 'Klm', logo: '042-klm.png'}, {title: 'Malaysia-Airlines', logo: '043-malaysia-airlines.png'}, {title: 'Thai', logo: '051-thai.png'}, {title: 'Qantas', logo: '052-qantas.png'}, {title: 'Japan-Airlines', logo: '053-japan-airlines.png'}, {title: 'Infiniti', logo: '061-infiniti.png'}, {title: 'Peugeot', logo: '062-peugeot.png'}, {title: 'Bmw', logo: '063-bmw.png'}, {title: 'Emirates', logo: '044-emirates.png'}, {title: 'Singapore-Airlines', logo: '045-singapore-airlines.png'}, {title: 'American-Airlines', logo: '054-american-airlines.png'}, {title: 'Air-Canada', logo: '055-air-canada.png'}, {title: 'Acura', logo: '064-acura.png'}, {title: 'Hyundai', logo: '065-hyundai.png'}, {title: 'Victory', logo: '016-victory.png'}, {title: 'Kymco', logo: '017-kymco.png'}, {title: 'Daelim', logo: '018-daelim.png'}, {title: 'Kawasaki', logo: '026-kawasaki.png'}, {title: 'Ktm', logo: '027-ktm.png'}, {title: 'Honda-1', logo: '028-honda-1.png'}, {title: 'Danish-Air-Transport', logo: '036-danish-air-transport.png'}, {title: 'Xiamen-Air', logo: '037-xiamen-air.png'}, {title: 'Swiss-International-Airlines', logo: '038-swiss-international-airlines.png'}, {title: 'Hero', logo: '019-hero.png'}, {title: 'Triumph', logo: '020-triumph.png'}, {title: 'Yamaha', logo: '029-yamaha.png'}, {title: 'Ducati', logo: '030-ducati.png'}, {title: 'Bangkok-Airways', logo: '039-bangkok-airways.png'}, {title: 'Turkish-Airlines', logo: '040-turkish-airlines.png'}, {title: 'Iberia', logo: '046-iberia.png'}, {title: 'British-Airways', logo: '047-british-airways.png'}, {title: 'Air-China', logo: '048-air-china.png'}, {title: 'Citroen', logo: '056-citroen.png'}, {title: 'Nissan', logo: '057-nissan.png'}, {title: 'Subaru', logo: '058-subaru.png'}, {title: 'Pontiac', logo: '066-pontiac.png'}, {title: 'Volkswagen', logo: '067-volkswagen.png'}, {title: 'Lexus', logo: '068-lexus.png'}, {title: 'Vueling', logo: '049-vueling.png'}, {title: 'Air-Newzealand', logo: '050-air-newzealand.png'}, {title: 'Mercury', logo: '059-mercury.png'}, {title: 'Suzuki', logo: '060-suzuki.png'}, {title: 'Honda', logo: '069-honda.png'}, {title: 'Renault', logo: '070-renault.png'}, {title: 'Opel', logo: '071-opel.png'}, {title: 'Cadillac', logo: '072-cadillac.png'}, {title: 'Volvo', logo: '073-volvo.png'}, {title: 'Audi', logo: '074-audi.png'}, {title: 'Chevrolet', logo: '075-chevrolet.png'}, {title: 'Mercedes-Benz', logo: '076-mercedes-benz.png'}, {title: 'Mitsubishi', logo: '077-mitsubishi.png'}, {title: 'Buick', logo: '078-buick.png'}, {title: 'Toyota', logo: '079-toyota.png'}, {title: 'Mazda', logo: '080-mazda.png'}
  ];
  checkedBrands = [];

  equipments = [
    'ISTA', 'BOSCH KTS', 'ODIS', 'VCDS', 'Mangoose', 'XENTRY connect'
  ];
  checkedEquipments = [];

  schedules: any;
  address: any;
  isValidAddress = null;
  location = null;

  constructor(
    private formBuilder: FormBuilder,
    @Inject('BASE_URL') public baseUrl: string,
    private dialog: MatDialog,
    private appService: AppService,
    private authorizationService: AuthorizationService,
    private router: Router
  ) {
    this.form = formBuilder.group({
      serviceName: ['', Validators.required],
      legalEntityName: ['', Validators.required],
      legalEntityNumber: ['', Validators.required],
      isOfficialDealer: [false],
      isInHolding: [false],
      holdingName: ['', Validators.required],
      holdingSite: ['', Validators.required],
      address: ['', Validators.required],
      servicePhone: ['', Validators.required],
      servicePhone2: [''],
      serviceTime: ['', Validators.required],
      serviceSite: ['', Validators.required],
      description: [''],
      receiversCount: [0],
      agreeWithCloudService: [false],
      agreeWithNVCD: [false]
    });
  }

  ngOnInit() {
  }

  addPhoto(event) {
    if (event.target.files.length > 0) {
      if (event.target.name === 'other') {
        for (const file of event.target.files) {
          this.createImage(file, result => {
            this.photos.push({
              file,
              image: result
            });
          });
        }
      } else {
        this.requiredPhotos[event.target.name] = {
          file: event.target.files[0],
          image: null
        };
        this.createImage(event.target.files[0], result => {
          this.requiredPhotos[event.target.name].image = result;
        });
      }
    }
  }

  deletePhoto(event, key: string, index: number = 0) {
    if (key === 'other') {
      this.photos.splice(index, 1);
    } else {
      this.requiredPhotos[key] = null;
    }
    event.preventDefault();
  }

  createImage(file, setter: (result) => void) {
    const fr = new FileReader();
    fr.onload = () => {
      setter(fr.result);
    };
    fr.readAsDataURL(file);
  }

  toggleBrand(event, brand) {
    if (this.checkedBrands.indexOf(brand) > -1) {
      this.checkedBrands.splice(this.checkedBrands.indexOf(brand), 1);
    } else {
      this.checkedBrands.push(brand);
    }
    event.stopPropagation();
  }

  toggleEquipment(event, brand) {
    if (this.checkedEquipments.indexOf(brand) > -1) {
      this.checkedEquipments.splice(this.checkedEquipments.indexOf(brand), 1);
    } else {
      this.checkedEquipments.push(brand);
    }
    event.stopPropagation();
  }

  changeReceiversCount(delta: number) {
    if (delta === -1 && this.form.get('receiversCount').value > 0) {
      this.form.get('receiversCount').setValue(this.form.get('receiversCount').value - 1);
    } else if (delta === 1) {
      this.form.get('receiversCount').setValue(this.form.get('receiversCount').value + 1);
    }
  }

  openTimeDialog() {
    this.dialog.open(SchedulesModalComponent, {
      width: '706px',
      height: '692px',
      data: {
        startValue: this.schedules,
        onClose: (schedules) => {
          this.schedules = schedules;
          let timeText = '';
          for (const day in this.schedules.schedules) {
            if (this.schedules.schedules[day].start && this.schedules.schedules[day].end) {
              if (timeText) {
                timeText += '; ';
              }
              timeText += day.substring(0, 1).toUpperCase() + day.substring(1) + ': ' +
                this.schedules.schedules[day].start + ' - ' + this.schedules.schedules[day].end;
            }
          }
          this.form.get('serviceTime').setValue(timeText);
        }
      }
    });
  }

  openAddressDialog() {
    this.isValidAddress = null;
    this.dialog.open(AddressDialogComponent, {
      width: '810px',
      height: '491px',
      data: {
        startValue: this.address,
        onClose: (address) => {
          this.address = address;
          let addressText = '';
          for (const path in this.address) {
            if (this.address[path]) {
              if (addressText) {
                addressText += ', ';
              }
              addressText += this.address[path];
            }
          }
          this.form.get('address').setValue(addressText);
          this.appService.checkAddress(addressText).subscribe(body => {
            if (body.success) {
              this.isValidAddress = true;
              this.location = body.data;
            } else {
              this.isValidAddress = false;
              this.location = null;
            }
          });
        }
      }
    });
  }

  checkValidForm(): boolean {
    return this.form.valid && this.isValidAddress && this.checkedBrands.length > 0 && this.checkedEquipments.length > 0
      && this.requiredPhotos.photo1 && this.requiredPhotos.photo2 && this.requiredPhotos.photo3
      && this.form.get('agreeWithCloudService').value && this.form.get('agreeWithNVCD').value;
  }

  submit() {
    this.form.markAllAsTouched();

    if (this.checkValidForm()) {
      const formData = new FormData();
      formData.set('legalEntityName', this.form.get('legalEntityName').value);
      formData.set('legalEntityNumber', this.form.get('legalEntityNumber').value);
      formData.set('isOfficialDealer', this.form.get('isOfficialDealer').value);
      formData.set('isInHolding', this.form.get('isInHolding').value);
      formData.set('holdingName', this.form.get('holdingName').value);
      formData.set('holdingSite', this.form.get('holdingSite').value);
      formData.set('serviceName', this.form.get('serviceName').value);
      formData.set('address', JSON.stringify(this.address));
      formData.set('servicePhone', this.form.get('servicePhone').value);
      formData.set('servicePhone2', this.form.get('servicePhone2').value);
      formData.set('serviceTime', this.form.get('serviceTime').value);
      formData.set('schedules', JSON.stringify(this.schedules));
      formData.set('serviceSite', this.form.get('serviceSite').value);
      formData.set('autoMarks', JSON.stringify(this.checkedBrands));
      formData.set('equipmentsAndSoftware', JSON.stringify(this.checkedEquipments));
      formData.set('servicePhotosCount', (this.photos.length + 3).toString());
      formData.set('servicePhotos' + 0, this.requiredPhotos.photo1.file);
      formData.set('servicePhotos' + 1, this.requiredPhotos.photo2.file);
      formData.set('servicePhotos' + 2, this.requiredPhotos.photo3.file);
      let count = 3;
      for (const photo of this.photos) {
        formData.set('servicePhotos' + count, photo.file);
        count++;
      }
      formData.set('description', this.form.get('description').value);
      formData.set('receiversCount', this.form.get('receiversCount').value);
      formData.set('latitude', this.location.latitude.toString());
      formData.set('longitude', this.location.longitude.toString());
      this.authorizationService.addService(formData).subscribe(body => {
        if (body.success) {
          localStorage.setItem('service', JSON.stringify(body.data));
          this.router.navigateByUrl('registration/3').then();
        } else {
          console.error(body);
        }
      });
    }
  }
}
