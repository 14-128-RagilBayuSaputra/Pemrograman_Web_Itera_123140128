from abc import ABC, abstractmethod

class LibraryItem(ABC):
    def __init__(self, title, item_id, year):
        self._title = title         
        self.__item_id = item_id    
        self.year = year            

    @property
    def item_id(self):
        """Getter untuk mengakses private attribute __item_id"""
        return self.__item_id

    @item_id.setter
    def item_id(self, new_id):
        """Setter untuk mengubah item_id dengan validasi sederhana"""
        if isinstance(new_id, int) and new_id > 0:
            self.__item_id = new_id
        else:
            print("ID tidak valid!")

    @abstractmethod
    def get_details(self):
        pass

class Book(LibraryItem):
    def __init__(self, title, item_id, year, author, isbn):
        super().__init__(title, item_id, year)
        self.author = author
        self.isbn = isbn

    def get_details(self):
        return f"[Buku] ID: {self.item_id} | Judul: {self._title} | Penulis: {self.author} ({self.year})"

class Magazine(LibraryItem):
    def __init__(self, title, item_id, year, issue_number):
        super().__init__(title, item_id, year)
        self.issue_number = issue_number

    def get_details(self):
        return f"[Majalah] ID: {self.item_id} | Judul: {self._title} | Edisi: #{self.issue_number} ({self.year})"

class Library:
    def __init__(self):
        self.__items = [] 

    def add_item(self, item):
        if isinstance(item, LibraryItem):
            self.__items.append(item)
            print(f"Berhasil menambahkan: {item._title}")
        else:
            print("Item tidak valid!")

    def show_items(self):
        print("\n--- Daftar Koleksi Perpustakaan ---")
        if not self.__items:
            print("Perpustakaan kosong.")
        else:
            for item in self.__items:
                print(item.get_details())
        print("------------------------------------\n")

    def search_item(self, keyword):
        print(f"Mencari dengan kata kunci: '{keyword}'...")
        found = False
        
        # PERBAIKAN: Ubah keyword jadi string dulu agar aman
        keyword_str = str(keyword) 

        for item in self.__items:
            # Bandingkan keyword (string) dengan Judul ATAU ID
            if keyword_str.lower() in item._title.lower() or str(item.item_id) == keyword_str:
                print(f"Ditemukan: {item.get_details()}")
                found = True
        
        if not found:
            print("Item tidak ditemukan.")
        print("")

if __name__ == "__main__":
    my_library = Library()

    buku1 = Book("Belajar Python OOP", 101, 2024, "Ragil Bayu", "978-3-16-148410-0")
    buku2 = Book("Algoritma Pemrograman", 102, 2023, "Saputra", "978-1-23-456789-0")
    majalah1 = Magazine("Tech Asia", 201, 2025, 55)

    my_library.add_item(buku1)
    my_library.add_item(buku2)
    my_library.add_item(majalah1)

    my_library.show_items()

    my_library.search_item("Python")

    my_library.search_item(201)

    print(f"Mengakses ID via Property: {buku1.item_id}") 