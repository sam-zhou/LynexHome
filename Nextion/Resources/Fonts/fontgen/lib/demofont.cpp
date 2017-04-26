#include <stdlib.h>
#include "demofont.h"

#ifndef EX_FONT_CHAR
# define EX_FONT_CHAR(value)
# define EX_FONT_UNICODE_VAL(value) (value),
# define EX_FONT_ANSI_VAL(value) (value),
#endif

struct _thin_ansi_font8x16 {unsigned short value; unsigned char data[1][16];} thin_ansi_font8x16[15] = 
{
	{
		EX_FONT_CHAR(" ")
		EX_FONT_ANSI_VAL(0x0020)
		{0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00}
	},
	{
		EX_FONT_CHAR("1")
		EX_FONT_ANSI_VAL(0x0031)
		{0x00, 0x00, 0x00, 0x10, 0x70, 0x10, 0x10, 0x10, 0x10, 0x10, 0x10, 0x10, 0x10, 0x7c, 0x00, 0x00}
	},
	{
		EX_FONT_CHAR("2")
		EX_FONT_ANSI_VAL(0x0032)
		{0x00, 0x00, 0x00, 0x3c, 0x42, 0x42, 0x42, 0x04, 0x04, 0x08, 0x10, 0x20, 0x42, 0x7e, 0x00, 0x00}
	},
	{
		EX_FONT_CHAR("3")
		EX_FONT_ANSI_VAL(0x0033)
		{0x00, 0x00, 0x00, 0x3c, 0x42, 0x42, 0x04, 0x18, 0x04, 0x02, 0x02, 0x42, 0x44, 0x38, 0x00, 0x00}
	},
	{
		EX_FONT_CHAR("6")
		EX_FONT_ANSI_VAL(0x0036)
		{0x00, 0x00, 0x00, 0x1c, 0x24, 0x40, 0x40, 0x58, 0x64, 0x42, 0x42, 0x42, 0x24, 0x18, 0x00, 0x00}
	},
	{
		EX_FONT_CHAR(":")
		EX_FONT_ANSI_VAL(0x003a)
		{0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x18, 0x18, 0x00, 0x00, 0x00, 0x00, 0x18, 0x18, 0x00, 0x00}
	},
	{
		EX_FONT_CHAR("a")
		EX_FONT_ANSI_VAL(0x0061)
		{0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x3c, 0x42, 0x1e, 0x22, 0x42, 0x42, 0x3f, 0x00, 0x00}
	},
	{
		EX_FONT_CHAR("b")
		EX_FONT_ANSI_VAL(0x0062)
		{0x00, 0x00, 0x00, 0xc0, 0x40, 0x40, 0x40, 0x58, 0x64, 0x42, 0x42, 0x42, 0x64, 0x58, 0x00, 0x00}
	},
	{
		EX_FONT_CHAR("c")
		EX_FONT_ANSI_VAL(0x0063)
		{0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x1c, 0x22, 0x40, 0x40, 0x40, 0x22, 0x1c, 0x00, 0x00}
	},
	{
		EX_FONT_CHAR("h")
		EX_FONT_ANSI_VAL(0x0068)
		{0x00, 0x00, 0x00, 0xc0, 0x40, 0x40, 0x40, 0x5c, 0x62, 0x42, 0x42, 0x42, 0x42, 0xe7, 0x00, 0x00}
	},
	{
		EX_FONT_CHAR("i")
		EX_FONT_ANSI_VAL(0x0069)
		{0x00, 0x00, 0x00, 0x30, 0x30, 0x00, 0x00, 0x70, 0x10, 0x10, 0x10, 0x10, 0x10, 0x7c, 0x00, 0x00}
	},
	{
		EX_FONT_CHAR("n")
		EX_FONT_ANSI_VAL(0x006e)
		{0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xdc, 0x62, 0x42, 0x42, 0x42, 0x42, 0xe7, 0x00, 0x00}
	},
	{
		EX_FONT_CHAR("r")
		EX_FONT_ANSI_VAL(0x0072)
		{0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xee, 0x32, 0x20, 0x20, 0x20, 0x20, 0xf8, 0x00, 0x00}
	},
	{
		EX_FONT_CHAR("t")
		EX_FONT_ANSI_VAL(0x0074)
		{0x00, 0x00, 0x00, 0x00, 0x00, 0x10, 0x10, 0x7c, 0x10, 0x10, 0x10, 0x10, 0x10, 0x0c, 0x00, 0x00}
	},
	{
		EX_FONT_CHAR("x")
		EX_FONT_ANSI_VAL(0x0078)
		{0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x6e, 0x24, 0x18, 0x18, 0x18, 0x24, 0x76, 0x00, 0x00}
	}
};

struct _wide_ansi_font16x16 {unsigned short value; unsigned char data[2][16];} wide_ansi_font16x16[12] = 
{
	{
		EX_FONT_CHAR("��")
		EX_FONT_ANSI_VAL(0xb0be)
		{0x1f, 0xf0, 0x10, 0x10, 0x1f, 0xf0, 0x10, 0x10, 0x1f, 0xf0, 0x01, 0x00, 0xff, 0xfe, 0x00, 0x00, 0x1f, 0xf0, 0x10, 0x10, 0x1f, 0xf0, 0x09, 0x20, 0x19, 0x18, 0x61, 0x0c, 0x05, 0x08, 0x02, 0x00}
	},
	{
		EX_FONT_CHAR("��")
		EX_FONT_ANSI_VAL(0xb3b1)
		{0x04, 0x80, 0x04, 0x98, 0x7c, 0xe0, 0x04, 0x84, 0x1c, 0x84, 0xe4, 0x7c, 0x40, 0x00, 0x1f, 0xf0, 0x10, 0x10, 0x1f, 0xf0, 0x10, 0x10, 0x10, 0x10, 0x1f, 0xf0, 0x10, 0x10, 0x10, 0x50, 0x10, 0x20}
	},
	{
		EX_FONT_CHAR("͸")
		EX_FONT_ANSI_VAL(0xb8cd)
		{0x00, 0x78, 0x47, 0x80, 0x20, 0x80, 0x2f, 0xfc, 0x01, 0xe0, 0x02, 0x90, 0xef, 0xec, 0x22, 0x40, 0x22, 0x78, 0x24, 0x08, 0x24, 0x08, 0x28, 0x28, 0x20, 0x10, 0x50, 0x00, 0x8f, 0xfc, 0x00, 0x00}
	},
	{
		EX_FONT_CHAR("��")
		EX_FONT_ANSI_VAL(0xc7ca)
		{0x00, 0x00, 0x0f, 0xf0, 0x08, 0x10, 0x0f, 0xf0, 0x08, 0x10, 0x0f, 0xf0, 0x00, 0x00, 0xff, 0xfe, 0x01, 0x00, 0x09, 0x00, 0x09, 0xf8, 0x09, 0x00, 0x15, 0x00, 0x23, 0x00, 0x40, 0xfe, 0x00, 0x00}
	},
	{
		EX_FONT_CHAR("��")
		EX_FONT_ANSI_VAL(0xcbc8)
		{0x01, 0x00, 0x01, 0x80, 0x01, 0x00, 0x01, 0x00, 0x01, 0x00, 0x01, 0x00, 0x02, 0x80, 0x02, 0x80, 0x04, 0x80, 0x04, 0x40, 0x08, 0x60, 0x08, 0x30, 0x10, 0x18, 0x20, 0x0e, 0x40, 0x04, 0x00, 0x00}
	},
	{
		EX_FONT_CHAR("��")
		EX_FONT_ANSI_VAL(0xd0d6)
		{0x01, 0x00, 0x01, 0x00, 0x21, 0x08, 0x3f, 0xfc, 0x21, 0x08, 0x21, 0x08, 0x21, 0x08, 0x21, 0x08, 0x21, 0x08, 0x3f, 0xf8, 0x21, 0x08, 0x01, 0x00, 0x01, 0x00, 0x01, 0x00, 0x01, 0x00, 0x01, 0x00}
	},
	{
		EX_FONT_CHAR("��")
		EX_FONT_ANSI_VAL(0xd2ce)
		{0x06, 0x40, 0x38, 0x50, 0x08, 0x48, 0x08, 0x48, 0x08, 0x40, 0xff, 0xfe, 0x08, 0x40, 0x08, 0x48, 0x0e, 0x28, 0x38, 0x30, 0xc8, 0x20, 0x08, 0x50, 0x09, 0x92, 0x08, 0x0a, 0x28, 0x06, 0x10, 0x02}
	},
	{
		EX_FONT_CHAR("��")
		EX_FONT_ANSI_VAL(0xd6d7)
		{0x02, 0x00, 0x01, 0x00, 0x3f, 0xfc, 0x20, 0x04, 0x40, 0x08, 0x1f, 0xe0, 0x00, 0x40, 0x00, 0x80, 0x01, 0x00, 0x7f, 0xfe, 0x01, 0x00, 0x01, 0x00, 0x01, 0x00, 0x01, 0x00, 0x05, 0x00, 0x02, 0x00}
	},
	{
		EX_FONT_CHAR("��")
		EX_FONT_ANSI_VAL(0xedbf)
		{0x02, 0x00, 0x01, 0x00, 0x7f, 0xfe, 0x44, 0x44, 0xbf, 0xf8, 0x04, 0x40, 0x00, 0x00, 0x1f, 0xf0, 0x11, 0x10, 0x11, 0x10, 0x11, 0x10, 0x12, 0x90, 0x02, 0x84, 0x04, 0x84, 0x18, 0x7c, 0x60, 0x00}
	},
	{
		EX_FONT_CHAR("��")
		EX_FONT_ANSI_VAL(0xf7c3)
		{0x00, 0xfc, 0x7c, 0x84, 0x44, 0x84, 0x44, 0x84, 0x44, 0xfc, 0x7c, 0x84, 0x44, 0x84, 0x44, 0x84, 0x44, 0xfc, 0x7c, 0x84, 0x00, 0x84, 0x01, 0x04, 0x01, 0x04, 0x02, 0x04, 0x04, 0x14, 0x00, 0x08}
	},
	{
		EX_FONT_CHAR("��")
		EX_FONT_ANSI_VAL(0xfab9)
		{0x00, 0x00, 0x7f, 0xfc, 0x40, 0x04, 0x5f, 0xf4, 0x41, 0x04, 0x41, 0x04, 0x41, 0x04, 0x4f, 0xe4, 0x41, 0x44, 0x41, 0x24, 0x41, 0x24, 0x5f, 0xf4, 0x40, 0x04, 0x40, 0x04, 0x7f, 0xfc, 0x40, 0x04}
	},
	{
		EX_FONT_CHAR("��")
		EX_FONT_ANSI_VAL(0xfbb7)
		{0x20, 0x40, 0x3f, 0x7e, 0x48, 0x50, 0x44, 0x88, 0x89, 0x10, 0x08, 0x10, 0x17, 0xfe, 0x10, 0x10, 0x32, 0x10, 0x51, 0x10, 0x91, 0x90, 0x10, 0x90, 0x10, 0x10, 0x10, 0x10, 0x10, 0x50, 0x10, 0x20}
	}
};

#undef thin_char_nr
#define thin_char_nr sizeof(thin_ansi_font8x16)/sizeof(thin_ansi_font8x16[0]) 
#undef wide_char_nr
#define wide_char_nr sizeof(wide_ansi_font16x16)/sizeof(wide_ansi_font16x16[0]) 

static EXFONT_DATA_ITEM thin_font16_items[thin_char_nr];
static EXFONT_DATA_ITEM wide_font16_items[wide_char_nr]; 
static EXFONT_DATA thin_font16; 
static EXFONT_DATA wide_font16; 

#ifndef RGB
#define RGB(r, g, b) (r) << 16 | (g) << 8 | (b)
#endif

PEXFONT install_ansi_16x16_font(void)
{
	size_t i = 0;
	PEXFONT font = (PEXFONT)malloc(sizeof(*font));

	for(i = 0; i < thin_char_nr; i++)
	{
		thin_font16_items[i].value = thin_ansi_font8x16[i].value;
		thin_font16_items[i].data = (unsigned char*)thin_ansi_font8x16[i].data;
	}

	for(i = 0; i < wide_char_nr; i++)
	{
		wide_font16_items[i].value = wide_ansi_font16x16[i].value;
		wide_font16_items[i].data = (unsigned char*)wide_ansi_font16x16[i].data;
	}

	EXFONT_data_init(&thin_font16, 8, 16, thin_char_nr, thin_font16_items);
	EXFONT_data_init(&wide_font16, 16, 16, wide_char_nr, wide_font16_items);

	EXFONT_init(font, "g_ansi_font16", 
		RGB(255, 0, 0), 
		RGB(0, 255, 0), 
		BKMODE_TRANSPARENT);

	EXFONT_set_thin_font_data(font, &thin_font16);
	EXFONT_set_wide_font_data(font, &wide_font16);

	return font;
}

#ifndef EX_FONT_CHAR
# define EX_FONT_CHAR(value)
# define EX_FONT_UNICODE_VAL(value) (value),
# define EX_FONT_ANSI_VAL(value) (value),
#endif

struct _thin_unicode_font16x32 {unsigned short value; unsigned char data[2][32];} thin_unicode_font16x32[14] = 
{
	{
		EX_FONT_CHAR(" ")
		EX_FONT_UNICODE_VAL(0x0020)
		{0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00}
	},
	{
		EX_FONT_CHAR("1")
		EX_FONT_UNICODE_VAL(0x0031)
		{0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x80, 0x03, 0x80, 0x1f, 0x80, 0x03, 0x80, 0x01, 0x80, 0x01, 0x80, 0x01, 0x80, 0x01, 0x80, 0x01, 0x80, 0x01, 0x80, 0x01, 0x80, 0x01, 0x80, 0x01, 0x80, 0x01, 0x80, 0x01, 0x80, 0x01, 0x80, 0x01, 0x80, 0x01, 0x80, 0x01, 0x80, 0x07, 0xe0, 0x1f, 0xf8, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00}
	},
	{
		EX_FONT_CHAR("2")
		EX_FONT_UNICODE_VAL(0x0032)
		{0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x07, 0xf0, 0x1c, 0x78, 0x30, 0x1c, 0x30, 0x1c, 0x30, 0x0c, 0x30, 0x0c, 0x30, 0x1c, 0x00, 0x1c, 0x00, 0x1c, 0x00, 0x38, 0x00, 0x70, 0x00, 0xe0, 0x01, 0xc0, 0x03, 0x80, 0x07, 0x00, 0x0e, 0x04, 0x0c, 0x04, 0x18, 0x0c, 0x30, 0x1c, 0x3f, 0xfc, 0x3f, 0xfc, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00}
	},
	{
		EX_FONT_CHAR("3")
		EX_FONT_UNICODE_VAL(0x0033)
		{0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x0f, 0xe0, 0x1c, 0xf0, 0x30, 0x38, 0x30, 0x38, 0x30, 0x18, 0x30, 0x18, 0x00, 0x38, 0x00, 0x38, 0x01, 0xf0, 0x03, 0xe0, 0x00, 0xf0, 0x00, 0x38, 0x00, 0x1c, 0x00, 0x1c, 0x00, 0x0c, 0x30, 0x0c, 0x30, 0x1c, 0x30, 0x1c, 0x30, 0x38, 0x1c, 0xf0, 0x0f, 0xe0, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00}
	},
	{
		EX_FONT_CHAR(":")
		EX_FONT_UNICODE_VAL(0x003a)
		{0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x03, 0xc0, 0x03, 0xc0, 0x03, 0xc0, 0x03, 0xc0, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x03, 0xc0, 0x03, 0xc0, 0x03, 0xc0, 0x03, 0xc0, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00}
	},
	{
		EX_FONT_CHAR("a")
		EX_FONT_UNICODE_VAL(0x0061)
		{0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x1f, 0xe0, 0x3c, 0xf0, 0x30, 0x70, 0x30, 0x30, 0x00, 0x30, 0x07, 0xf0, 0x1f, 0xb0, 0x38, 0x30, 0x70, 0x30, 0x60, 0x30, 0x60, 0x30, 0x70, 0x72, 0x79, 0xf6, 0x3f, 0xbe, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00}
	},
	{
		EX_FONT_CHAR("b")
		EX_FONT_UNICODE_VAL(0x0062)
		{0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x18, 0x00, 0x78, 0x00, 0x38, 0x00, 0x18, 0x00, 0x18, 0x00, 0x18, 0x00, 0x18, 0x00, 0x18, 0x00, 0x19, 0xf8, 0x1b, 0xbc, 0x1e, 0x0e, 0x1c, 0x0e, 0x1c, 0x0e, 0x18, 0x06, 0x18, 0x06, 0x18, 0x06, 0x18, 0x06, 0x18, 0x0e, 0x18, 0x0e, 0x1c, 0x0c, 0x1f, 0x38, 0x13, 0xf0, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00}
	},
	{
		EX_FONT_CHAR("c")
		EX_FONT_UNICODE_VAL(0x0063)
		{0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x07, 0xf0, 0x0f, 0x78, 0x1c, 0x38, 0x38, 0x18, 0x38, 0x18, 0x38, 0x00, 0x30, 0x00, 0x30, 0x00, 0x30, 0x00, 0x38, 0x04, 0x38, 0x0c, 0x1c, 0x08, 0x0f, 0x38, 0x07, 0xf0, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00}
	},
	{
		EX_FONT_CHAR("h")
		EX_FONT_UNICODE_VAL(0x0068)
		{0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x18, 0x00, 0x78, 0x00, 0x38, 0x00, 0x18, 0x00, 0x18, 0x00, 0x18, 0x00, 0x18, 0x00, 0x18, 0x00, 0x19, 0xf8, 0x1f, 0xbc, 0x1e, 0x1c, 0x1c, 0x0c, 0x18, 0x0c, 0x18, 0x0c, 0x18, 0x0c, 0x18, 0x0c, 0x18, 0x0c, 0x18, 0x0c, 0x18, 0x0c, 0x18, 0x0c, 0x3c, 0x1e, 0x7e, 0x3f, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00}
	},
	{
		EX_FONT_CHAR("i")
		EX_FONT_UNICODE_VAL(0x0069)
		{0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0xc0, 0x01, 0xc0, 0x01, 0xc0, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x03, 0x80, 0x1f, 0x80, 0x03, 0x80, 0x01, 0x80, 0x01, 0x80, 0x01, 0x80, 0x01, 0x80, 0x01, 0x80, 0x01, 0x80, 0x01, 0x80, 0x01, 0x80, 0x01, 0x80, 0x01, 0x80, 0x03, 0xc0, 0x1f, 0xf8, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00}
	},
	{
		EX_FONT_CHAR("n")
		EX_FONT_UNICODE_VAL(0x006e)
		{0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x18, 0x00, 0x79, 0xf8, 0x1f, 0xbc, 0x1e, 0x1c, 0x1c, 0x0c, 0x18, 0x0c, 0x18, 0x0c, 0x18, 0x0c, 0x18, 0x0c, 0x18, 0x0c, 0x18, 0x0c, 0x18, 0x0c, 0x18, 0x0c, 0x3c, 0x1e, 0x7e, 0x3f, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00}
	},
	{
		EX_FONT_CHAR("r")
		EX_FONT_UNICODE_VAL(0x0072)
		{0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x1e, 0x00, 0x7e, 0x3e, 0x0e, 0x76, 0x06, 0xc6, 0x07, 0x80, 0x07, 0x00, 0x06, 0x00, 0x06, 0x00, 0x06, 0x00, 0x06, 0x00, 0x06, 0x00, 0x06, 0x00, 0x06, 0x00, 0x0f, 0x00, 0x7f, 0xe0, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00}
	},
	{
		EX_FONT_CHAR("t")
		EX_FONT_UNICODE_VAL(0x0074)
		{0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x03, 0x00, 0x03, 0x00, 0x03, 0x00, 0x0f, 0x00, 0x3f, 0xf8, 0x03, 0x00, 0x03, 0x00, 0x03, 0x00, 0x03, 0x00, 0x03, 0x00, 0x03, 0x00, 0x03, 0x00, 0x03, 0x00, 0x03, 0x00, 0x03, 0x04, 0x03, 0x8c, 0x03, 0xdc, 0x01, 0xf8, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00}
	},
	{
		EX_FONT_CHAR("x")
		EX_FONT_UNICODE_VAL(0x0078)
		{0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x3f, 0x7c, 0x1e, 0x38, 0x0f, 0x30, 0x07, 0x60, 0x07, 0xe0, 0x03, 0xc0, 0x01, 0xc0, 0x03, 0xe0, 0x03, 0xe0, 0x06, 0xf0, 0x0c, 0x70, 0x0c, 0x38, 0x38, 0x3c, 0x7c, 0x7e, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00}
	}
};

struct _wide_unicode_font32x32 {unsigned short value; unsigned char data[4][32];} wide_unicode_font32x32[13] = 
{
	{
		EX_FONT_CHAR("��")
		EX_FONT_UNICODE_VAL(0x4e0d)
		{0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x10, 0x00, 0x00, 0x00, 0x38, 0x3f, 0xff, 0xff, 0xfc, 0x18, 0x01, 0xe0, 0x00, 0x00, 0x01, 0xc0, 0x00, 0x00, 0x03, 0xc0, 0x00, 0x00, 0x03, 0x80, 0x00, 0x00, 0x07, 0x80, 0x00, 0x00, 0x07, 0x80, 0x00, 0x00, 0x0f, 0xc0, 0x00, 0x00, 0x0f, 0x98, 0x00, 0x00, 0x1d, 0x8e, 0x00, 0x00, 0x39, 0x87, 0x00, 0x00, 0x79, 0x83, 0x80, 0x00, 0x71, 0x81, 0xe0, 0x00, 0xe1, 0x80, 0xf0, 0x01, 0xc1, 0x80, 0x78, 0x03, 0x81, 0x80, 0x38, 0x07, 0x01, 0x80, 0x3c, 0x0c, 0x01, 0x80, 0x1c, 0x38, 0x01, 0x80, 0x0c, 0x20, 0x01, 0x80, 0x00, 0x00, 0x01, 0x80, 0x00, 0x00, 0x01, 0x80, 0x00, 0x00, 0x01, 0x80, 0x00, 0x00, 0x01, 0x80, 0x00, 0x00, 0x01, 0x80, 0x00, 0x00, 0x01, 0x80, 0x00, 0x00, 0x01, 0x80, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00}
	},
	{
		EX_FONT_CHAR("��")
		EX_FONT_UNICODE_VAL(0x4e2d)
		{0x00, 0x00, 0x00, 0x00, 0x00, 0x03, 0x80, 0x00, 0x00, 0x03, 0x80, 0x00, 0x00, 0x03, 0x80, 0x00, 0x00, 0x03, 0x80, 0x00, 0x00, 0x03, 0x80, 0x00, 0x00, 0x03, 0x80, 0x20, 0x0c, 0x03, 0x80, 0x70, 0x0f, 0xff, 0xff, 0xf0, 0x0c, 0x03, 0x80, 0x70, 0x0c, 0x03, 0x80, 0x70, 0x0c, 0x03, 0x80, 0x70, 0x0c, 0x03, 0x80, 0x70, 0x0c, 0x03, 0x80, 0x70, 0x0c, 0x03, 0x80, 0x70, 0x0c, 0x03, 0x80, 0x70, 0x0c, 0x03, 0x80, 0x70, 0x0f, 0xff, 0xff, 0xf0, 0x0c, 0x03, 0x80, 0x70, 0x0c, 0x03, 0x80, 0x60, 0x00, 0x03, 0x80, 0x00, 0x00, 0x03, 0x80, 0x00, 0x00, 0x03, 0x80, 0x00, 0x00, 0x03, 0x80, 0x00, 0x00, 0x03, 0x80, 0x00, 0x00, 0x03, 0x80, 0x00, 0x00, 0x03, 0x80, 0x00, 0x00, 0x03, 0x80, 0x00, 0x00, 0x03, 0x80, 0x00, 0x00, 0x03, 0x80, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00}
	},
	{
		EX_FONT_CHAR("��")
		EX_FONT_UNICODE_VAL(0x4eba)
		{0x00, 0x00, 0x00, 0x00, 0x00, 0x03, 0x00, 0x00, 0x00, 0x03, 0xc0, 0x00, 0x00, 0x03, 0xc0, 0x00, 0x00, 0x03, 0x80, 0x00, 0x00, 0x07, 0x80, 0x00, 0x00, 0x07, 0x80, 0x00, 0x00, 0x07, 0x80, 0x00, 0x00, 0x07, 0x80, 0x00, 0x00, 0x07, 0xc0, 0x00, 0x00, 0x07, 0xc0, 0x00, 0x00, 0x07, 0xc0, 0x00, 0x00, 0x07, 0xc0, 0x00, 0x00, 0x06, 0x60, 0x00, 0x00, 0x0e, 0x60, 0x00, 0x00, 0x0e, 0x60, 0x00, 0x00, 0x0e, 0x70, 0x00, 0x00, 0x0c, 0x30, 0x00, 0x00, 0x1c, 0x38, 0x00, 0x00, 0x1c, 0x18, 0x00, 0x00, 0x38, 0x1c, 0x00, 0x00, 0x30, 0x0e, 0x00, 0x00, 0x70, 0x0f, 0x00, 0x00, 0xe0, 0x07, 0x80, 0x01, 0xc0, 0x03, 0xc0, 0x03, 0x80, 0x03, 0xf0, 0x07, 0x00, 0x01, 0xfe, 0x0e, 0x00, 0x00, 0xfe, 0x38, 0x00, 0x00, 0x30, 0x60, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00}
	},
	{
		EX_FONT_CHAR("��")
		EX_FONT_UNICODE_VAL(0x56fd)
		{0x00, 0x00, 0x00, 0x00, 0x0c, 0x00, 0x00, 0x30, 0x0f, 0xff, 0xff, 0xf8, 0x0e, 0x00, 0x00, 0x30, 0x0e, 0x00, 0x00, 0x30, 0x0e, 0x00, 0x03, 0x30, 0x0e, 0xff, 0xff, 0xb0, 0x0e, 0xc1, 0x80, 0x30, 0x0e, 0x01, 0x80, 0x30, 0x0e, 0x01, 0x80, 0x30, 0x0e, 0x01, 0x80, 0x30, 0x0e, 0x01, 0x84, 0x30, 0x0e, 0x01, 0x8e, 0x30, 0x0e, 0x7f, 0xff, 0x30, 0x0e, 0x01, 0xa0, 0x30, 0x0e, 0x01, 0xb0, 0x30, 0x0e, 0x01, 0x9c, 0x30, 0x0e, 0x01, 0x9e, 0x30, 0x0e, 0x01, 0x8e, 0x30, 0x0e, 0x01, 0x8e, 0x30, 0x0e, 0x01, 0x83, 0x30, 0x0e, 0x01, 0x87, 0xb0, 0x0f, 0xff, 0xff, 0xb0, 0x0e, 0x00, 0x00, 0x30, 0x0e, 0x00, 0x00, 0x30, 0x0e, 0x00, 0x00, 0x30, 0x0f, 0xff, 0xff, 0xf0, 0x0e, 0x00, 0x00, 0x30, 0x0e, 0x00, 0x00, 0x30, 0x0c, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00}
	},
	{
		EX_FONT_CHAR("��")
		EX_FONT_UNICODE_VAL(0x5b57)
		{0x00, 0x00, 0x00, 0x00, 0x00, 0x03, 0x00, 0x00, 0x00, 0x03, 0xc0, 0x00, 0x00, 0x01, 0xc0, 0x20, 0x06, 0x01, 0xc0, 0x30, 0x07, 0xff, 0xff, 0xf8, 0x06, 0x00, 0x00, 0x78, 0x0e, 0x00, 0x00, 0xe0, 0x1e, 0x00, 0x00, 0xc0, 0x1c, 0x00, 0x02, 0x80, 0x03, 0xff, 0xff, 0x00, 0x03, 0xff, 0xff, 0x80, 0x00, 0x00, 0x1e, 0x00, 0x00, 0x00, 0x38, 0x00, 0x00, 0x00, 0x70, 0x00, 0x00, 0x01, 0xc0, 0x00, 0x00, 0x01, 0xc0, 0x18, 0x00, 0x01, 0x80, 0x3c, 0x7f, 0xff, 0xff, 0xfc, 0x00, 0x01, 0x80, 0x00, 0x00, 0x01, 0x80, 0x00, 0x00, 0x01, 0x80, 0x00, 0x00, 0x01, 0x80, 0x00, 0x00, 0x01, 0x80, 0x00, 0x00, 0x01, 0x80, 0x00, 0x00, 0x01, 0x80, 0x00, 0x00, 0x71, 0x80, 0x00, 0x00, 0x3f, 0x80, 0x00, 0x00, 0x0f, 0x80, 0x00, 0x00, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00}
	},
	{
		EX_FONT_CHAR("��")
		EX_FONT_UNICODE_VAL(0x5bbd)
		{0x00, 0x00, 0x00, 0x00, 0x00, 0x07, 0x00, 0x00, 0x00, 0x03, 0xc0, 0x00, 0x00, 0x01, 0xc0, 0x00, 0x04, 0x01, 0xc0, 0x10, 0x0f, 0xff, 0xff, 0xf0, 0x0f, 0xff, 0xff, 0xfc, 0x1c, 0x18, 0x18, 0x70, 0x1c, 0x1e, 0x1c, 0x40, 0x18, 0x1c, 0x18, 0x70, 0x0f, 0xff, 0xff, 0xf8, 0x0f, 0xff, 0xff, 0xf8, 0x00, 0x1c, 0x18, 0x00, 0x00, 0x1c, 0x18, 0x00, 0x00, 0xd0, 0x03, 0x00, 0x00, 0xff, 0xff, 0x80, 0x00, 0xc2, 0x03, 0x00, 0x00, 0xc3, 0x83, 0x00, 0x00, 0xc3, 0xc3, 0x00, 0x00, 0xc3, 0x83, 0x00, 0x00, 0xc3, 0xe3, 0x00, 0x00, 0xc3, 0xf3, 0x00, 0x00, 0xc7, 0xe3, 0x10, 0x00, 0xc7, 0xe3, 0x10, 0x00, 0xce, 0x62, 0x10, 0x00, 0x0e, 0x60, 0x10, 0x00, 0x1c, 0x60, 0x18, 0x00, 0x78, 0x60, 0x3c, 0x01, 0xe0, 0x7f, 0xf8, 0x1f, 0x80, 0x7f, 0xf0, 0x18, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00}
	},
	{
		EX_FONT_CHAR("��")
		EX_FONT_UNICODE_VAL(0x6211)
		{0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x00, 0x00, 0x0e, 0x70, 0x00, 0x00, 0x3e, 0x73, 0x00, 0x03, 0xff, 0x73, 0x80, 0x1f, 0xe0, 0x71, 0xc0, 0x00, 0x60, 0x71, 0xe0, 0x00, 0x60, 0x70, 0xe0, 0x00, 0x60, 0x70, 0x40, 0x00, 0x60, 0x70, 0x10, 0x00, 0x60, 0x70, 0x38, 0x3f, 0xff, 0xff, 0xfc, 0x00, 0x60, 0x70, 0x00, 0x00, 0x60, 0x70, 0xc0, 0x00, 0x60, 0x70, 0xe0, 0x00, 0x60, 0xf1, 0xf0, 0x00, 0x67, 0xf1, 0xc0, 0x00, 0x7c, 0x33, 0x80, 0x03, 0xf0, 0x37, 0x80, 0x7f, 0xe0, 0x3f, 0x00, 0x3e, 0x60, 0x3e, 0x00, 0x38, 0x60, 0x1c, 0x00, 0x00, 0x60, 0x3c, 0x04, 0x00, 0x60, 0x7e, 0x04, 0x00, 0x61, 0xef, 0x0c, 0x00, 0x63, 0x87, 0x8c, 0x00, 0x6e, 0x03, 0xec, 0x0f, 0xf8, 0x01, 0xfc, 0x03, 0xe0, 0x00, 0xfe, 0x01, 0xc0, 0x00, 0x3e, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00}
	},
	{
		EX_FONT_CHAR("��")
		EX_FONT_UNICODE_VAL(0x660e)
		{0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x60, 0x30, 0x08, 0x08, 0x7f, 0xf8, 0x0f, 0xfc, 0x60, 0x30, 0x0f, 0xfc, 0x60, 0x30, 0x0c, 0x18, 0x60, 0x30, 0x0c, 0x18, 0x60, 0x30, 0x0c, 0x18, 0x60, 0x30, 0x0c, 0x18, 0x60, 0x30, 0x0c, 0x18, 0x7f, 0xf0, 0x0f, 0xf8, 0x60, 0x30, 0x0f, 0xf8, 0x60, 0x30, 0x0c, 0x18, 0xe0, 0x30, 0x0c, 0x18, 0xe0, 0x30, 0x0c, 0x18, 0xe0, 0x30, 0x0c, 0x18, 0xe0, 0x30, 0x0c, 0x18, 0xff, 0xf0, 0x0f, 0xf8, 0xe0, 0x30, 0x0f, 0xf8, 0xe0, 0x30, 0x0c, 0x18, 0xc0, 0x30, 0x0c, 0x18, 0xc0, 0x30, 0x0c, 0x01, 0xc0, 0x30, 0x00, 0x01, 0x80, 0x30, 0x00, 0x03, 0x80, 0x30, 0x00, 0x07, 0x00, 0x70, 0x00, 0x0e, 0x0f, 0xf0, 0x00, 0x1c, 0x0f, 0xf0, 0x00, 0x38, 0x01, 0xe0, 0x00, 0xe0, 0x00, 0xc0, 0x00, 0x80, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00}
	},
	{
		EX_FONT_CHAR("��")
		EX_FONT_UNICODE_VAL(0x662f)
		{0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x02, 0x00, 0x00, 0x60, 0x07, 0x00, 0x00, 0x7f, 0xff, 0x80, 0x00, 0x60, 0x07, 0x00, 0x00, 0x60, 0x07, 0x00, 0x00, 0x60, 0x07, 0x00, 0x00, 0x7f, 0xff, 0x00, 0x00, 0x60, 0x07, 0x00, 0x00, 0x60, 0x07, 0x00, 0x00, 0x60, 0x07, 0x00, 0x00, 0x7f, 0xff, 0x00, 0x00, 0x7f, 0xff, 0x00, 0x00, 0x60, 0x07, 0x00, 0x00, 0x40, 0x00, 0x30, 0x3f, 0xff, 0xff, 0xf8, 0x1f, 0xff, 0xff, 0xfc, 0x00, 0xc1, 0xc0, 0x00, 0x00, 0xf1, 0xc0, 0x00, 0x00, 0xe1, 0xc0, 0x40, 0x00, 0xe1, 0xff, 0xe0, 0x01, 0xc1, 0xff, 0xf0, 0x01, 0xc1, 0xc0, 0x00, 0x01, 0xe1, 0xc0, 0x00, 0x03, 0xb9, 0xc0, 0x00, 0x07, 0x1f, 0xc0, 0x00, 0x06, 0x0f, 0xe0, 0x00, 0x0c, 0x03, 0xff, 0xfe, 0x18, 0x00, 0x7f, 0xf8, 0x30, 0x00, 0x03, 0xf0, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00}
	},
	{
		EX_FONT_CHAR("��")
		EX_FONT_UNICODE_VAL(0x666f)
		{0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x80, 0x01, 0xff, 0xff, 0xc0, 0x01, 0xff, 0xff, 0xc0, 0x01, 0xc0, 0x01, 0x80, 0x01, 0xff, 0xff, 0x80, 0x01, 0xff, 0xff, 0x80, 0x01, 0xc0, 0x01, 0x80, 0x01, 0xc0, 0x01, 0x80, 0x01, 0xff, 0xff, 0x80, 0x01, 0xc1, 0xc1, 0x80, 0x00, 0x01, 0xc0, 0x18, 0x00, 0x00, 0xc0, 0x3c, 0x3f, 0xff, 0xff, 0xfc, 0x00, 0x00, 0x01, 0x00, 0x00, 0xff, 0xff, 0x80, 0x00, 0xff, 0xff, 0x80, 0x00, 0xc0, 0x03, 0x80, 0x00, 0xc0, 0x03, 0x80, 0x00, 0xc0, 0x03, 0x80, 0x00, 0xff, 0xff, 0x80, 0x00, 0xc1, 0xc3, 0x00, 0x00, 0x21, 0xc8, 0x00, 0x00, 0x71, 0xcf, 0x00, 0x01, 0xf9, 0xc3, 0xc0, 0x03, 0xc1, 0xc1, 0xf0, 0x07, 0x01, 0xc0, 0xf8, 0x1c, 0x1f, 0xc0, 0x38, 0x30, 0x07, 0x80, 0x38, 0x00, 0x03, 0x80, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00}
	},
	{
		EX_FONT_CHAR("��")
		EX_FONT_UNICODE_VAL(0x7b26)
		{0x00, 0x00, 0x00, 0x00, 0x01, 0x80, 0x0c, 0x00, 0x01, 0xe0, 0x1e, 0x00, 0x03, 0xc0, 0x1c, 0x00, 0x03, 0x83, 0x18, 0x18, 0x07, 0xff, 0xbf, 0xfc, 0x06, 0x30, 0x31, 0x80, 0x0e, 0x1c, 0x61, 0xc0, 0x1c, 0x1c, 0xe0, 0xc0, 0x18, 0x28, 0xc0, 0xc0, 0x30, 0x71, 0x83, 0x00, 0x00, 0x70, 0x03, 0x80, 0x00, 0xe0, 0x03, 0x80, 0x00, 0xe0, 0x03, 0x8c, 0x01, 0xdf, 0xff, 0xfe, 0x03, 0x88, 0x03, 0x80, 0x07, 0xc0, 0x03, 0x80, 0x07, 0x83, 0x03, 0x80, 0x0d, 0x83, 0x83, 0x80, 0x19, 0x81, 0xc3, 0x80, 0x71, 0x81, 0xc3, 0x80, 0x01, 0x80, 0xe3, 0x80, 0x01, 0x80, 0xc3, 0x80, 0x01, 0x80, 0x03, 0x80, 0x01, 0x80, 0x03, 0x80, 0x01, 0x80, 0x03, 0x80, 0x01, 0x80, 0x03, 0x80, 0x01, 0x80, 0x7f, 0x80, 0x01, 0x80, 0x1f, 0x80, 0x01, 0x80, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00}
	},
	{
		EX_FONT_CHAR("��")
		EX_FONT_UNICODE_VAL(0x80cc)
		{0x00, 0x00, 0x00, 0x00, 0x00, 0x18, 0x30, 0x00, 0x00, 0x1c, 0x38, 0x20, 0x00, 0x1c, 0x30, 0x70, 0x1f, 0xfc, 0x31, 0xf0, 0x00, 0x1c, 0x37, 0xe0, 0x00, 0x1c, 0x3e, 0x18, 0x00, 0x1c, 0x30, 0x18, 0x01, 0xfc, 0x30, 0x18, 0x3f, 0xfc, 0x30, 0x1c, 0x3e, 0x1c, 0x3f, 0xfc, 0x30, 0x1c, 0x3f, 0xf8, 0x00, 0x1c, 0x00, 0x00, 0x01, 0x80, 0x01, 0x80, 0x01, 0xff, 0xff, 0xc0, 0x01, 0xc0, 0x03, 0x80, 0x01, 0xc0, 0x03, 0x80, 0x01, 0xc0, 0x03, 0x80, 0x01, 0xff, 0xff, 0x80, 0x01, 0xc0, 0x03, 0x80, 0x01, 0xc0, 0x03, 0x80, 0x01, 0xc0, 0x03, 0x80, 0x01, 0xff, 0xff, 0x80, 0x01, 0xc0, 0x03, 0x80, 0x01, 0xc0, 0x03, 0x80, 0x01, 0xc0, 0x03, 0x80, 0x01, 0xc0, 0x03, 0x80, 0x01, 0xc0, 0x7f, 0x80, 0x01, 0xc0, 0x0f, 0x80, 0x01, 0xc0, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00}
	},
	{
		EX_FONT_CHAR("͸")
		EX_FONT_UNICODE_VAL(0x900f)
		{0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x80, 0x08, 0x00, 0x0f, 0xc0, 0x0e, 0x01, 0xff, 0xc0, 0x07, 0x1f, 0xf8, 0x00, 0x07, 0x80, 0x38, 0x00, 0x03, 0x80, 0x38, 0x18, 0x03, 0x9f, 0xff, 0xfc, 0x00, 0x18, 0xfc, 0x00, 0x00, 0x01, 0xfe, 0x00, 0x00, 0x03, 0xbb, 0x80, 0x03, 0x07, 0x39, 0xe0, 0x7f, 0x8e, 0x38, 0xfc, 0x7f, 0x9c, 0x39, 0x7e, 0x03, 0x7f, 0xff, 0x98, 0x03, 0xcf, 0xff, 0x80, 0x03, 0x01, 0xc3, 0x00, 0x03, 0x01, 0xc7, 0x60, 0x03, 0x01, 0xc7, 0xf0, 0x03, 0x01, 0x86, 0x60, 0x03, 0x03, 0x80, 0xe0, 0x03, 0x03, 0x00, 0xe0, 0x03, 0x06, 0x00, 0xe0, 0x0f, 0x0c, 0x1d, 0xc0, 0x1f, 0xd8, 0x0f, 0xc0, 0x38, 0x70, 0x03, 0x80, 0x70, 0x3c, 0x02, 0x00, 0x30, 0x1f, 0xff, 0xfe, 0x00, 0x07, 0xff, 0xf8, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00}
	}
};


#undef thin_char_nr
#define thin_char_nr sizeof(thin_unicode_font16x32)/sizeof(thin_unicode_font16x32[0]) 
#undef wide_char_nr
#define wide_char_nr sizeof(wide_unicode_font32x32)/sizeof(wide_unicode_font32x32[0]) 

static EXFONT_DATA_ITEM thin_font32_items[thin_char_nr];
static EXFONT_DATA_ITEM wide_font32_items[wide_char_nr]; 
static EXFONT_DATA thin_font32; 
static EXFONT_DATA wide_font32; 

#ifndef RGB
#define RGB(r, g, b) (r) << 32 | (g) << 16 | (b)
#endif

PEXFONT install_unicode_32x32_font(void)
{
	size_t i = 0;
	PEXFONT font = (PEXFONT)malloc(sizeof(*font));

	for(i = 0; i < thin_char_nr; i++)
	{
		thin_font32_items[i].value = thin_unicode_font16x32[i].value;
		thin_font32_items[i].data = (unsigned char*)thin_unicode_font16x32[i].data;
	}

	for(i = 0; i < wide_char_nr; i++)
	{
		wide_font32_items[i].value = wide_unicode_font32x32[i].value;
		wide_font32_items[i].data = (unsigned char*)wide_unicode_font32x32[i].data;
	}

	EXFONT_data_init(&thin_font32, 16, 32, thin_char_nr, thin_font32_items);
	EXFONT_data_init(&wide_font32, 32, 32, wide_char_nr, wide_font32_items);

	EXFONT_init(font, "g_unicode_font32", 
		RGB(255, 0, 0), 
		RGB(0, 255, 0), 
		BKMODE_TRANSPARENT);

	EXFONT_set_thin_font_data(font, &thin_font32);
	EXFONT_set_wide_font_data(font, &wide_font32);

	return font;
}

static PEXFONT g_ansi_font16 = NULL;
static PEXFONT g_unicode_font32 = NULL;

void InstallFont(draw_pixel_func my_draw_pixel, void* ctx)
{
	if(g_unicode_font32 == NULL)
	{
		g_ansi_font16 = install_ansi_16x16_font();
		g_unicode_font32 = install_unicode_32x32_font();

	}
	EXFONT_set_draw_func(g_ansi_font16, my_draw_pixel, ctx);
	EXFONT_set_draw_func(g_unicode_font32, my_draw_pixel, ctx);
	
	return;
}
//�����й���͸�����������ַ�խ16x32widechar :thinabc2354465478568dfgs
#define STR_ANSI_TRANSPARENT    "16x16: ���ַ� ͸������ �����й��� thin char 123abc "
#define STR_UNICODE_TRANSPARENT L"32x32: ���ַ� ͸������ �����й��� thin char 123abc "

#define STR_ANSI_OPAQUE     "16x16: ���ַ� ͸������ �����й��� thin char 123abc "
#define STR_UNICODE_OPAQUE L"32x32: ���ַ� ��͸������ �����й��� thin char 123abc"

void TestDrawText(draw_pixel_func draw_pixel, void* draw_pixel_ctx)
{
	InstallFont(draw_pixel, draw_pixel_ctx);

	EXFONT_bkmode(g_ansi_font16) = BKMODE_TRANSPARENT;
	EXFONT_draw_a(g_ansi_font16, 10, 10, STR_ANSI_TRANSPARENT);
	EXFONT_bkmode(g_ansi_font16) = BKMODE_OPAQUE;
	EXFONT_draw_a(g_ansi_font16, 10, 40, STR_ANSI_OPAQUE);

#if defined(WIN32) || defined(LINUX)
	EXFONT_bkmode(g_unicode_font32) = BKMODE_TRANSPARENT;
	EXFONT_draw_w(g_unicode_font32, 10, 80, STR_UNICODE_TRANSPARENT);
	EXFONT_bkmode(g_unicode_font32) = BKMODE_OPAQUE;
	EXFONT_draw_w(g_unicode_font32, 10, 120, STR_UNICODE_OPAQUE);
#endif

	return ;
}