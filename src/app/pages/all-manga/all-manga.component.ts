import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MangaService } from '../../../services/manga.service';
import {
  GetMangaAsyncDTO,
  GetMangaDTO,
  UpdateMangaDTO,
} from '../../../interfaces/IManga';
import { Response } from '../../../interfaces/IResponse';
import { SelectModule } from 'primeng/select';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-all-manga',
  imports: [
    CommonModule,
    PaginatorModule,
    DialogModule,
    FormsModule,
    CardModule,
    ButtonModule,
    ConfirmDialogModule,
    ReactiveFormsModule,
    SelectModule,
    ToastModule,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './all-manga.component.html',
  styleUrl: './all-manga.component.css',
})
export class AllMangaComponent implements OnInit {
  // Data
  mangas!: GetMangaDTO[];
  selectedManga?: GetMangaAsyncDTO;
  selectedMangaId: number = -1;
  newType: string = '';
  newPublisher: string = '';
  // Form
  addMangaForm: FormGroup;
  // Dialog
  showDetailDialog: boolean = false;
  showAddDialog: boolean = false;
  // Option
  mangaPublisherOptions: string[] = ['Siam Inter comics', 'Pheonix Next'];
  mangaTypeOptions: string[] = ['Manga', 'Light Novel'];

  private confirmationService = inject(ConfirmationService);
  private mangaService = inject(MangaService);
  private formBuilder = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);
  private messageService = inject(MessageService);

  constructor() {
    this.addMangaForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      publisher: [{ value: '', disabled: false }, [Validators.required]],
      type: [{ value: '', disabled: false }, [Validators.required]],
      imageUrl: [''],
      start: [1, [Validators.required]],
      end: [1, [Validators.required]],
      notHave: [[]],
      description: [''],
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.mangaService.getManga().subscribe({
      next: (response: Response) => {
        console.log('Load Manga Response', response);
        this.mangas = response.data;
        this.cdr.detectChanges();
        // this.messageService.add({
        //   severity: 'info',
        //   summary: 'Load Mangas',
        //   detail: response.message,
        // });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Load Mangas',
          detail: err.message,
        });
      },
    });
  }

  confirmDelete(mangaData: GetMangaDTO) {
    this.confirmationService.confirm({
      header: 'Are you sure?',
      message: `you want to delete ${mangaData.title}`,
      accept: () => {
        this.mangaService.deleteManga(mangaData.mangaId).subscribe({
          next: (response: Response) => {
            this.loadData();
            this.messageService.add({
              severity: 'success',
              summary: 'Delete Manga',
              detail: response.message,
            });
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Delete Manga',
              detail: err.message,
            });
          },
        });
      },
      reject: () => {},
    });
  }

  detailDialog(mangaData: GetMangaDTO) {
    this.selectedMangaId = mangaData.mangaId;
    this.mangaService
      .getMangaAsync(this.selectedMangaId)
      .subscribe((response: any) => {
        this.selectedManga = response.data[0];
        this.showDetailDialog = true;
      });
  }

  addDialog() {
    this.selectedManga = undefined;
    this.selectedMangaId = -1;
    this.showAddDialog = true;
  }

  editDialog() {
    this.showDetailDialog = false;
    this.showAddDialog = true;
    if (this.selectedManga) {
      this.addMangaForm.patchValue(this.selectedManga);
    }
  }

  onSubmit() {
    if (this.addMangaForm.valid) {
      const formValue = this.addMangaForm.value;
      let notHave: number[] = [];
      if (typeof formValue.notHave === 'string') {
        notHave = formValue.notHave
          .split(',')
          .map((val: string) => Number(val.trim()))
          .filter((n: any) => !isNaN(n));
      } else if (Array.isArray(formValue.notHave)) {
        notHave = formValue.notHave
          .map((n: any) => Number(n))
          .filter((n: any) => !isNaN(n));
      }
      const newManga: UpdateMangaDTO = {
        title: formValue.title,
        publisher: formValue.publisher || this.newPublisher,
        type: formValue.type || this.newType,
        imageUrl: formValue.imageUrl,
        start: Number(formValue.start),
        end: Number(formValue.end),
        notHave,
        description: formValue.description,
      };
      if (this.selectedMangaId === -1) {
        this.mangaService.createManga(newManga).subscribe({
          next: (response: Response) => {
            this.loadData();
            this.showAddDialog = false;
            this.messageService.add({
              severity: 'success',
              summary: 'Create Manga',
              detail: response.message,
            });
          },
          error: (err) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Create Manga',
              detail: err.message,
            });
          },
        });
      } else {
        this.mangaService
          .updateManga(newManga, this.selectedMangaId)
          .subscribe({
            next: (response: Response) => {
              this.loadData();
              this.showAddDialog = false;
              this.messageService.add({
                severity: 'success',
                summary: 'Update Manga',
                detail: response.message,
              });
            },
            error: (err) => {
              this.messageService.add({
                severity: 'success',
                summary: 'Update Manga',
                detail: err.message,
              });
            },
          });
      }
    }
  }

  resetForm() {
    this.addMangaForm.reset({
      title: '',
      publisher: { value: '', disabled: false },
      type: { value: '', disabled: false },
      imageUrl: '',
      start: 1,
      end: 1,
      notHave: [],
      description: '',
    });
    this.selectedManga = undefined;
    this.newType = '';
    this.newPublisher = '';
    this.onPublisherInputChange();
    this.onTypeInputChange();
  }

  onPublisherInputChange() {
    if (this.newPublisher) {
      this.addMangaForm.get('publisher')?.disable();
      this.addMangaForm.get('publisher')?.setValue(this.newPublisher);
    } else {
      this.addMangaForm.get('publisher')?.enable();
    }
  }

  onTypeInputChange() {
    if (this.newType) {
      this.addMangaForm.get('type')?.disable();
      this.addMangaForm.get('type')?.setValue(this.newType);
    } else {
      this.addMangaForm.get('type')?.enable();
    }
  }
}
