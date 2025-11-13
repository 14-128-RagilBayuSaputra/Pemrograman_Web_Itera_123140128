database_mahasiswa = [
    {
        'nama':'Ragil Bayu Saputra',
        'NIM': '123140128',
        'nilai_uts': 77,
        'nilai_uas': 90,
        'nilai_tugas': 85
    },
    {
        'nama':'Falih Faiq',
        'NIM': '123140129',
        'nilai_uts': 88,
        'nilai_uas': 92,
        'nilai_tugas': 80  
    },
    {
        'nama':'Andre Prasetya',
        'NIM': '123140130',
        'nilai_uts': 70,
        'nilai_uas': 75,
        'nilai_tugas': 80
    },
    {
        'nama':'Rafael Abimanyu Ratmoko',
        'NIM': '123140134',
        'nilai_uts': 85,
        'nilai_uas': 87,
        'nilai_tugas': 90
    },
    {
        'nama':'Muhammad Daffansyah',
        'NIM': '123140127',
        'nilai_uts': 60,
        'nilai_uas': 70,
        'nilai_tugas': 65
    }
]
def hitung_nilai_akhir(uts, uas, tugas):
    nilai_akhir = (0.3 * uts) + (0.4 * uas) + (0.3 * tugas)
    return nilai_akhir

def tentukan_grade(nilai_akhir):
    if nilai_akhir >= 80:
        return 'A'
    elif nilai_akhir >= 70:
        return 'B'
    elif nilai_akhir >= 60:
        return 'C'
    elif nilai_akhir >= 50:
        return 'D'
    else:
        return 'E'
    
def tampilkan_data_mahasiswa(database):
    if not database:
        print("Tidak ada data untuk ditampilkan.")
        return
    
    print("=" * 90)
    print(f"{'no':<4} | {'nama':<18} | {'NIM':<10} | {'uts':<5} | {'uas':<5} | {'tugas':<5} | {'nilai akhir':<12} | {'grade':<5}")
    print("-" * 90)
    for i, mahasiswa in enumerate(database, start=1):
        uts = mahasiswa['nilai_uts']
        uas = mahasiswa['nilai_uas']
        tugas = mahasiswa['nilai_tugas']
        nilai_akhir = hitung_nilai_akhir(uts, uas, tugas)
        grade = tentukan_grade(nilai_akhir)
        
        print(f"{i:<4} | {mahasiswa['nama']:<18} | {mahasiswa['NIM']:<10} | {uts:<5} | {uas:<5} | {tugas:<5} | {nilai_akhir:<12.2f} | {grade:<5}")   
    print("=" * 90)
    
def cari_nilai_tertinggi(database):
    if not database:
        return None,None
    
    tertinggi_mahasiswa = database[0]
    tertinggi_nilai = hitung_nilai_akhir (
        tertinggi_mahasiswa['nilai_uts'],
        tertinggi_mahasiswa['nilai_uas'],
        tertinggi_mahasiswa['nilai_tugas']
    )
    
    for mahasiswa in database[1:]:
        nilai_sekarang =  hitung_nilai_akhir (
            mahasiswa['nilai_uts'],
            mahasiswa['nilai_uas'],
            mahasiswa['nilai_tugas']
        )
        
    if nilai_sekarang > tertinggi_nilai:
        tertinggi_nilai = nilai_sekarang
        tertinggi_mahasiswa = mahasiswa
    
    return tertinggi_mahasiswa, tertinggi_nilai


def cari_nilai_terendah(database):
    if not database:
        return None, None
    
    terendah_mahasiswa = database[0]
    terendah_nilai = hitung_nilai_akhir (
        terendah_mahasiswa['nilai_uts'],
        terendah_mahasiswa['nilai_uas'],    
        terendah_mahasiswa['nilai_tugas']
    )
    
    for mahasiswa in database[1:]:
        nilai_sekarang =  hitung_nilai_akhir (
            mahasiswa['nilai_uts'],
            mahasiswa['nilai_uas'],
            mahasiswa['nilai_tugas']
        )
        
        if nilai_sekarang < terendah_nilai:
            terendah_nilai = nilai_sekarang
            terendah_mahasiswa = mahasiswa
            
    return terendah_mahasiswa, terendah_nilai

def tampilkan_analisis_data():
    print("\n" + ("-" * 40))
    print("--- Analisis Data ---")
    
    mhs_tertinggi, nilai_tertinggi = cari_nilai_tertinggi(database_mahasiswa)
    if mhs_tertinggi:
        print(f"Nilai Akhir Tertinggi : {nilai_tertinggi:.2f} (Grade: {tentukan_grade(nilai_tertinggi)})")
        print(f"Diraih oleh            : {mhs_tertinggi['nama']} (NIM: {mhs_tertinggi['NIM']})")
    print("-" * 20)
    
    mhs_terendah, nilai_terendah = cari_nilai_terendah(database_mahasiswa)
    if mhs_terendah:
        print(f"Nilai Akhir Terendah  : {nilai_terendah:.2f} (Grade: {tentukan_grade(nilai_terendah)})")
        print(f"Diraih oleh             : {mhs_terendah['nama']} (NIM: {mhs_terendah['NIM']})")
    print("-" * 40)
    
def input_nilai_valid(prompt):
    while True:
        try:
            nilai_str = input(prompt)
            nilai = int(nilai_str)
            if 0 <= nilai <= 100 :
                return nilai
            else :
                print("Nilai harus antara 0 hingga 100. Silakan coba lagi.")
        except ValueError:
            print("Input tidak valid. Silakan masukkan angka antara 0 hingga 100.")
            
def tambah_data_mahasiswa():
    print("Masukkan data mahasiswa ")
    
    nama = input("masukkan nama :")
    NIM = input("masukkan NIM :")
    
    uts = input_nilai_valid("masukkan nilai UTS :")
    uas = input_nilai_valid("masukkan nilai UAS :")
    tugas = input_nilai_valid("masukkan nilai Tugas :")
    
    mahasiswa_baru = {
        'nama': nama,
        'NIM' : NIM,
        'nilai_uts': uts,
        'nilai_uas' : uas,
        'nilai_tugas' : tugas
    }            
    database_mahasiswa.append(mahasiswa_baru)
    print(f"Data mahasiswa {nama} berhasil ditambahkan.")
    
def filter_data_grade():
    print(f"filter mahasiswa berdasarkan grade")
    
    grade_input = input("masukkan grade yang diinginkan (A-E):").upper()
    if grade_input not in ['A','B','C','D','E']:
        print("Grade tidak valid. Silakan masukkan grade antara A hingga E.")
        return
    
    hasil_filter = []
    
    for mahasiswa in database_mahasiswa:
        nilai_akhir = hitung_nilai_akhir(
            mahasiswa['nilai_uts'],
            mahasiswa['nilai_uas'],
            mahasiswa['nilai_tugas']
        )
        grade_mahasiswa = tentukan_grade(nilai_akhir)
        
        if grade_mahasiswa == grade_input:
            hasil_filter.append(mahasiswa)
            
        print(f"hasil filter untuk grade '{grade_input}':")
        tampilkan_data_mahasiswa(hasil_filter)  

def hitung_rata_rata_kelas():
    print(f"\n Rata Rata nilai Akhir kelas")
    
    if not database_mahasiswa:
        print("belum ada data mahasiswa")
        return
    
    total_nilai_akhir = 0
    
    for mahasiswa in database_mahasiswa:
        total_nilai_akhir += hitung_nilai_akhir(
            mahasiswa['nilai_uts'],
            mahasiswa['nilai_uas'],
            mahasiswa['nilai_tugas']
        )
        
    rata_rata = total_nilai_akhir / len(database_mahasiswa)
    print(f"jumlah mahasiswa: {len(database_mahasiswa)}")
    print(f"total nilai akhir : {total_nilai_akhir:.2f}")
    print(f"rata rata nilai kelas : {rata_rata:.2f}")
    
def menu_utama():
    while True:
        print("\n" + "=" * 40)
        print("   Program Pengelolaan Nilai Mahasiswa")
        print("=" * 40)
        print("Menu:")
        print("1. Tampilkan Semua Data Mahasiswa")
        print("2. Tambah Data Mahasiswa")
        print("3. Tampilkan Analisis Data (Max/Min)")
        print("4. Filter Mahasiswa Berdasarkan Grade")
        print("5. Hitung Rata-rata Nilai Kelas")
        print("6. Keluar")
        print("-" * 40)
        
        pilihan = input("masukkan pilihan anda (1-6):")
        
        if pilihan == '1':
            print("\n data lengkap mahasiswa")
            tampilkan_data_mahasiswa(database_mahasiswa)
            
        elif pilihan == '2':   
            tambah_data_mahasiswa()
            
        elif pilihan == '3':
            tampilkan_analisis_data()
        
        elif pilihan == '4':
            filter_data_grade()
            
        elif pilihan == '5':
            hitung_rata_rata_kelas()
            
        elif pilihan == '6':
            print("Terima kasih")
            break
        else:
            print("\n pilihan tidak valid, silahkan pilih (1-6)")
    
if __name__ == "__main__":
    menu_utama()